FROM hayd/deno:alpine-1.1.1

EXPOSE 8000

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (this is re-run only when deps.ts is modified).
# Ideally this will download and compile _all_ external files used in main.ts.
COPY deps.ts /app
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . /app
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache mod.ts

# These are passed as deno arguments when run with docker:
CMD ["run", "--allow-net", "--allow-read", "mod.ts"]