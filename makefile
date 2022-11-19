dev:
	export CGO_CFLAGS_ALLOW="-Xpreprocessor"
	go run ./backend serve

upgrade:
	export CGO_CFLAGS_ALLOW="-Xpreprocessor"
	go run ./backend upgrade

watch:
	export CGO_CFLAGS_ALLOW="-Xpreprocessor"
	ulimit -n 1000 #increase the file watch limit, might required on MacOS
	reflex -s -r '\.go$$' make dev
