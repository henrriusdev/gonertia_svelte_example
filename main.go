package main

import (
	"log"
	"net/http"

	inertia "github.com/romsar/gonertia/v3"
)

func main() {
	i := initInertia()

	mux := http.NewServeMux()

	mux.Handle("/home", i.Middleware(homeHandler(i)))
	mux.Handle("/build/", http.StripPrefix("/build/", http.FileServer(http.Dir("./public/build"))))

	log.Fatal(http.ListenAndServe(":3000", mux))
}

func initInertia() *inertia.ViteInstance {
	rootViewFile := "resources/views/root.html"

	i, err := inertia.NewFromFile(rootViewFile)
	if err != nil {
		log.Fatal(err)
	}

	// Wrap with Vite and configure Vite-specific options
	app, err := inertia.NewWithVite(i,
		inertia.WithHotFile("public/hot"),                                // Hot reload file path
		inertia.WithBuildManifest("public/build/manifest.json"),          // Build manifest path
		inertia.WithFallbackManifest("public/build/.vite/manifest.json"), // Fallback manifest
		inertia.WithBuildDir("/build/"),                                  // Build output directory
		inertia.WithHotReloadPort("//localhost:3200"),                    // Hot reload server port
	)
	if err != nil {
		log.Fatal(err)
	}

	return app
}

func homeHandler(i *inertia.ViteInstance) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		err := i.Render(w, r, "Home/Index", inertia.Props{
			"text": "Inertia.js with Svelte and Go! 💙",
		})
		if err != nil {
			handleServerErr(w, err)
			return
		}
	}

	return http.HandlerFunc(fn)
}

func handleServerErr(w http.ResponseWriter, err error) {
	log.Printf("http error: %s\n", err)
	w.WriteHeader(http.StatusInternalServerError)
	w.Write([]byte("server error"))
}
