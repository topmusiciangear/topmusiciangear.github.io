# Development Guide for Pinokio Projects

## Non-Negotiable Execution Workflow

To guarantee every contribution follows this guide precisely, obey this checklist **before any edits** and **again before finalizing**. Do not skip or reorder.
1. **AGENTS Snapshot:** Re-open this file and write down (in your working notes or response draft) the exact sections relevant to the requested task. No work begins until this snapshot exists.
2. **Destination Resolution:** Before creating or editing any Pinokio launcher files, resolve `PINOKIO_HOME` to an absolute path and record the intended destination root. If running outside Pinokio's own managed runtime, resolve in this order: `~/.pinokio/config.json` `home`, then `GET http://127.0.0.1:42000/pinokio/home` and use its `path` value, and if loopback is unreachable but `access` exists in `~/.pinokio/config.json`, retry the same request against `<protocol>://<host>:<port>/pinokio/home`, then the `PINOKIO_HOME` environment variable. If `PINOKIO_HOME` is still unresolved, stop and ask the user. Never silently use the current workspace as the launcher destination.
3. **Example Lock-in:** Identify the closest matching script in `C:\pinokio\prototype\system\examples`. Record its path and keep it open while editing. Every launcher change must mirror that reference unless the user explicitly instructs otherwise.
4. **Pre-flight Checklist:** Convert the applicable rules from this document and `PINOKIO.md` at C:\pinokio\prototype\PINOKIO.md into a task-specific checklist (install/start/reset/update structure, regex patterns, menu defaults, log checks, destination path, etc.). Confirm each item is ticked **before** making changes.
5. **Mid-task Verification:** Any time you touch a Pinokio script, cross-check the corresponding example line to ensure syntax and structure match. Document the reference (example path + line) in your reasoning.
6. **Exit Checklist:** Before responding to the user, revisit the pre-flight checklist and explicitly confirm every item is satisfied. If anything diverges from the example or these rules, fix it first.

If any step cannot be completed, stop immediately and ask the user how to proceed. These six steps are mandatory for every session.

### Critical Pattern Lock: Capturing Web UI URLs

When writing `start.js` (or any script that needs to surface a web URL for a server):

1. **Always copy the capture block from an example such as `system/examples/mochi/start.js`.**
```javascript
on: [{
  event: "/(http:\\/\\/[0-9.:]+)/",
  done: true
}]
```

2. **Set the local variable using the captured match exactly as below (The regex capture object is passed in as `input.event`, so need to use the index 1 inside the parenthesis):**
```javascript
{
  method: "local.set",
  params: {
    url: "{{input.event[1]}}"
  }
}
```

3. Always try to come up with the most generic regex.
4. During the exit checklist, explicitly confirm that the `url` local variable is set via `local.set` API by using the captured regex object as passed in as `input.event` from the previous `shell.run` step.

Deviation from this pattern requires written approval from the user.

- Make sure to keep this entire document and `PINOKIO.md` at C:\pinokio\prototype\PINOKIO.md in memory with high priority before making any decision. Pinokio is a system that makes it easy to write launchers through scripting by providing various cross-platform APIs, so whenever possible you should prioritize using Pinokio API over lower level APIs.
- When writing pinokio scripts, ALWAYS check the examples folder (in C:\pinokio\prototype\system\examples folder) to see if there are existing example scripts you can imitate, instead of assuming syntax.
- When implementing pinokio script APIs and you cannot infer the syntax just based on the examples, always search the API documentation `PINOKIO.md` at C:\pinokio\prototype\PINOKIO.md to use the correct syntax instead of assuming the syntax.
- When trying to fix something or figure out what's going on, ALWAYS start by checking the `logs` folder before doing anything else, as mentioned in the "Troubleshooting with Logs" section.
- Finally, make sure to ALWAYS follow all the items in the "best practices" section below.

## Determine User Intent
If the initial prompt is simply a URL and nothing else, check the website content and determine the intent, and ask the user to confirm. For example a URL may point to

1. A Tutorial: the intent may be to implement a demo for the tutorial and build a launcher.
2. A Demo: the intent may be a 1-click launcher for the demo
3. Open source project: the intent may be a 1-click launcher for the project 
4. Regular website: the intent may be to clone the website and a launcher.
5. There can be other cases, but try to guess.

## Working With Launchers

Apply this section only when the task is to create, modify, debug, review, or document a Pinokio launcher project.

If the request is not about launcher work, do not force an app-launcher vs plugin-launcher decision.

When the task does involve launcher work, first determine whether the request is for an app launcher or a plugin launcher. These are separate project types and must not be mixed.

### Mandatory Destination Resolution
- Before creating, editing, or moving any launcher files, resolve `PINOKIO_HOME` to an absolute path.
- If running outside Pinokio's own managed runtime, resolve `PINOKIO_HOME` in this order:
  1. `~/.pinokio/config.json` -> `home`
  2. `GET http://127.0.0.1:42000/pinokio/home` -> `path`
  3. If loopback is unreachable but `access` exists in `~/.pinokio/config.json`, retry the same request against `<protocol>://<host>:<port>/pinokio/home`
  4. `PINOKIO_HOME` environment variable
- Normalize the resolved value to an absolute path before using it.
- If neither source yields a valid `PINOKIO_HOME`, stop immediately and ask the user how to proceed. Do not guess. Do not silently fall back to the current workspace.
- If the current workspace is outside the resolved `PINOKIO_HOME/api` and `PINOKIO_HOME/plugin` trees, treat the current workspace only as source material, reference material, or evidence. Do not create the launcher in that workspace.
- Before any file creation, record and verify the exact target path:
  - app launcher: `PINOKIO_HOME/api/<unique_name>`
  - plugin launcher: `PINOKIO_HOME/plugin/<unique_name>`
- If the unique folder name is not obvious, ask the user before creating the target folder.

### 1. App launchers
- App launchers must live under `PINOKIO_HOME/api/<unique_name>`.
- App launchers are usually project-local launchers that manage one app in its own launcher/app folder.
- If you are already inside the target app launcher folder, build in that folder.
- If you are not already inside an app launcher folder, create a new folder under `PINOKIO_HOME/api/<unique_name>`.
- If the folder name is not obvious from the project or the user has not provided one, ask the user to confirm the folder name before creating it.
- Do not place app launchers under `PINOKIO_HOME/plugin`.

### 2. Plugin launchers
- Plugin launchers must live under `PINOKIO_HOME/plugin/<unique_name>`.
- Plugin launchers are reusable shared tools that are installed once and then used across many different folders.
- Standalone plugin launchers should keep `path: "plugin"` in the root `pinokio.js` so Pinokio installs them into `PINOKIO_HOME/plugin`.
- If you are already inside the target plugin launcher folder, build in that folder.
- If you are not already inside a plugin launcher folder, create a new folder under `PINOKIO_HOME/plugin/<unique_name>`.
- If the folder name is not obvious from the project or the user has not provided one, ask the user to confirm the folder name before creating it.
- Do not place plugin launchers under `PINOKIO_HOME/api`.
- When a plugin is meant to operate on the user's current project, its `run` step should target the caller's folder with `{{args.cwd}}` instead of the plugin folder itself.

### 3. Apply structure rules only after choosing the launcher type
- App launchers and plugin launchers are peers. Do not treat a plugin launcher as a special case of an app launcher, or vice versa.
- Decide the launcher type and destination folder first, then apply the project structure and script rules below.

## Project Structure

Pinokio projects normally follow a standardized structure with app logic separated from launcher scripts:

Pinokio projects follow a standardized structure with app logic separated from launcher scripts:

```
project-root/
â”œâ”€â”€ app/                 # Self-contained app logic (can be standalone repo)
â”‚   â”œâ”€â”€ package.json     # Node.js projects
â”‚   â”œâ”€â”€ requirements.txt # Python projects
â”‚   â””â”€â”€ ...              # Other language-specific files
â”œâ”€â”€ README.md            # Documentation
â”œâ”€â”€ install.js           # Installation script
â”œâ”€â”€ start.js             # Launch script
â”œâ”€â”€ update.js            # Update script (for updating the scripts and app logic to the latest)
â”œâ”€â”€ reset.js             # Reset dependencies script
â”œâ”€â”€ pinokio.js           # UI generator script
â””â”€â”€ pinokio.json         # Metadata (title, description, icon)
```

- Keep app code in `/app` folder only (never in root)
- Store all launcher files in project root (never in `/app`)
- `/app` folder should be self-contained and publishable


The only exceptions are serverless web apps---purely frontend only web applications that do NOT have a server component and connect to 3rd party API endpoints--in which case the folder structure looks like the following (No need for launcher scripts since the index.html will automatically launch. The only thing needed is the metadata file named pinokio.json):

```
project-root/
â”œâ”€â”€ index.html           # The serverless web app entry point
â”œâ”€â”€ ...
â”œâ”€â”€ README.md            # Documentation
â””â”€â”€ pinokio.json         # Metadata (title, description, icon)
```

IMPORTANT: ALWAYS try to follow the best practices in the examples folder (C:\pinokio\prototype\system\examples) instead of trying to come up with your own structure. The examples have been optimized for the best user experience.

## Launcher Project Working Directory

- The project working directory for a script is always the same directory as the script location.
- For example, when you run `shell.run` API inside `pinokio/start.js`, the default path for shell execution is `pinokio`.
- If the launcher files are in the project root path, then the default path for shell execution is the project root.
- Therefore, it is important to specify the correct `path` attribute when running `shell.run` API commands.

Example: in the following project structure:

```
project-root/
â”œâ”€â”€ pinokio/                 # Pinokio launcher folder
â”‚    â”œâ”€â”€ start.js             # Launch script
â”‚    â”œâ”€â”€ pinokio.js           # UI generator script
â”‚    â””â”€â”€ pinokio.json         # Metadata (title, description, icon)
â””â”€â”€â”€ backend/
     â”œâ”€â”€ requirements.txt          # App dependencies
     â””â”€â”€ app.py                    # App code
```

The `pinokio/start.js` should use the correct path `../backend` as the `path` attribute, as follows:

```
{
  run: [{
    ...
  }, {
    method: "shell.run",
    params: {
      message: "python app.py",
      venv: "env",
      path: "../backend"
    }
  }, {
    ...
  }]
}
```

## Development Workflow

### 1. Understanding the Project
- Check `SPEC.md` in project root. If the file exists, use that to learn about the project details (what and how to build)
- If no `SPEC.md` exists, build based on user requirements
### 2. Modifying Existing Launcher Projects
If we are starting with existing launcher script files, work with the existing files instead of coming up with your own.
- **Preserve existing functionality:** Only modify necessary parts
- **Don't touch working scripts:** Unless adding/updating specific commands
- **Follow existing conventions:** Match the style and structure already present
### 3. Try to adopt from examples as much as possible
- If starting from scratch, first determine what type of project you will be building, and then check the examples folder (C:\pinokio\prototype\system\examples) to see if you can adopt them instead of coming up everything from scratch.
- Even if there are no relevant examples, check the examples to get inspiration for how you would structure the script files even if you have to write from scratch.
### 4. Writing from scratch as a last resort
If there are relevant examples to adopt from, write the scripts from scratch, but just make sure to follow the requirements in the next section.
### 5. Debugging
When the user reports something is not working, ALWAYS inspect the logs folder to get all the execution logs. For more info on how this works, check the "Troubleshooting with Logs" section below.

## Script Requirements

### 1. 1-click launchable
- The main purpose of Pinokio is to provide an easy interface to invoke commands, which may include launching servers, installing programs, etc. Make sure the final product provides ways to install, launch, reset, and update whatever is needed.

### 2. Write Documentation
- ALWAYS write a documentation. A documentation must be stored as `README.md` in the project root folder, along with the rest of the pinokio launcher script files. A documentation file must contain:
  - What the app does
  - How to use the app
  - API documentation for programmatically accessing the app's main features (Javascript, Python, and Curl)

## Types of launchers
## 1. Launching servers
- When an app requires launching a server, here are the commonly used scripts:
  - `install.js`: a script to install the app
  - `start.js`: a script to start the app
  - `reset.js`: a script to reset all the dependencies installed in the `install.js` step. used if the user wants to restart from scratch
  - `update.js`: a script to update the launcher AND the app in case there are new updates. Involves pulling in the relevant git repositories installed through `install.js` (often it's the script repo and some git repositories cloned through the install steps if any)
  - `pinokio.js`: the launcher script that ties all of the above scripts together by providing a UI that links to these scripts.
  - `pinokio.json`: For metadata

Here's a basic server launcher script example (`start.js`). Unless there's a special reason you need to use another pattern, this is the most recommended pattern. Use this or adopt it as needed, but NEVER try something else unless there's a good reason you should not take this approach:

```javascript
module.exports = {
  // By setting daemon: true, the script keeps running even after all items in the `run` array finishes running. Mandatory for launching servers, since otherwise the shells running the server process will get killed after the scripts finish running.
  daemon: true,
  run: [
    {
      // The "shell.run" API for running a shell session
      method: "shell.run",
      params: {
        // Edit 'venv' to customize the venv folder path
        venv: "env",
        // Edit 'env' to customize environment variables (see documentation)
        env: { },
        // Edit 'path' to customize the path to start the shell from
        path: "app",
        // Edit 'message' to customize the commands, or to run multiple commands
        message: [
          "python app.py",
        ],
        on: [{
          // The regular expression pattern to monitor.
          // Whenever each "event" pattern occurs in the shell terminal, the shell will return,
          // and the script will go onto the next step.
          // The regular expression match object will be passed on to the next step as `input.event`
          // Useful for capturing the URL at which the server is running (in case the server prints some message about where the server is running)
          "event": "/(http:\/\/\\S+)/", 

          // Use "done": true to move to the next step while keeping the shell alive.
          // Use "kill": true to move to the next step after killing the shell.
          "done": true
        }]
      }
    },
    {
      // This step sets the local variable 'url'.
      // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        // In this example, since the pattern was "/(http:\/\/\\S+)/", input.event[1] will include the exact http url match caputred by the parenthesis.
        // Therefore setting the local variable 'url'
        url: "{{input.event[1]}}"
      }
    }
  ]
}
```

## 2. Launching serverless web apps

- In case of purely static web apps WITHOUT servers or backends (for example an HTML based app that connects to 3rd party servers--either remote or localhost), we do NOT need the launcher scripts.
- In these cases, simply include `index.html` in the project root folder and everything should automatically work. No need for any of the pinokio launcher scripts. (Do 
- You still need to include the metadata file so they show up properly on pinokio:
  - `pinokio.json`: For metadata

## 3. Launching quick scripts without web UI

- In many cases, we may not even need a web UI, but instead just a simple way to run scripts.
- This may include TUI (Terminal User Interface) apps, a simple launcher 
- In these cases, all we need is the launcher file `pinokio.js`, which may link to multiple scripts. In this case, there are no web apps (no serverless apsp, no servers), but instead just the default pinokio launcher UI that calls a bunch of scripts.
- Here are some examples:
  - A pinokio script to toggle the desktop theme between dark and light
    - Write some code (python or javascript or whatever)
    - Write a `toggle.js` pinokio script that executes the code
    - Write a `pinokio.js` launcher script to create a sidebar UI that displays the `toggle.js` so the user can simply click the "toggle" button to toggle back and forth between desktop themes
  - A pinokio script to fetch some file
    - Write some code (python or javascript or whatever)
    - Write a `fetch.js` pinokio script that executes the code
    - Write a `pinokio.js` launcher script to create a sidebar UI that displays the `fetch.js` so the user can simply click the "fetch" button to fetch some data.
- You still need to include the metadata file so they show up properly on pinokio:
  - `pinokio.json`: For metadata

## API

This section lists all the script APIs available on Pinokio. To learn the details of how they are used, you can:
1. Check the examples in the C:\pinokio\prototype\system\examples folder
2. Read the `PINOKIO.md` at C:\pinokio\prototype\PINOKIO.md further documentation on the full syntax

### Script API

These APIs can be used to describe each step in a pinokio script:
- shell.run: run shell commands
- input: accept user input
- filepicker: accept file upload
- fs.write: write to file
- fs.read: read from file
- fs.copy: copy files
- fs.download: download files
- fs.link: create a symbolic link (or junction on windows) for folders
- fs.open: open the system file explorer at a given path
- fs.cat: print file contents
- jump: jump to a specific step
- local.set: set local variables for the currently running script
- json.set: update a json file
- json.rm: remove keys from a json file
- json.get: get values from a json file
- log: print to the web terminal
- net: make network requests
- notify: display a notification
- script.download: download a script from a git uri
- script.start: start a script
- script.stop: stop a script
- script.return: return values if the current script was called by a caller script, so the caller script can utilize the return value as `input`
- web.open: open a url in web browser
- hf.download: huggingfac-cli download API
### Template variables
The following variables are accessible inside template expressions (example `{{args.command}` in scripts, resulting in dynamic behaviors of scripts:
- input: An input is a variable that gets passed from one RPC call to the next
- args: args is the parameter object that gets passed into the script (via pinokio.js `params`). Unlike `input` which takes the value passed in from the immediately previous step, `args` is a global value that is the same through out the entire script execution.
- local: local variable object that can be set with `local.set` API
- self: refers to the script file itself (which is JSON or JavaScript). For example if `start.js` that's currently running has `daemon: true` set, `{{self.daemon}}` will evaluate to true.
- uri: The current script uri
- port: The next available port. Very useful when you need to launch an app at a specific port without port conflicts.
- cwd: The current script execution folder path
- platform: The current operating system. May be one of the following: `darwin`, `win32`, `linux`
- arch: The current system architecture. May be one of the following: x32, x64, arm, arm64, s390, s390x, mipsel, ia32, mips, ppc, ppc64
- gpus: array of available GPUs on the machine (example: `['apple']`, `['nvidia']`)
- gpu: the first available GPU (example: `nvidia`)
- current: The current variable points to the index of the currently executing instruction within the run array.
- next: The next variable points to the index of the next instruction to be executed. (null if the current instruction is the final instruction in the run array)
- envs: You can access the environment variables of the currently running process with envs object.
- which: Check whether a command exists and return its absolute path (example: `{{which('winget')}}`). This is the correct way to resolve command paths inside reproducible Pinokio scripts, including custom shell selection such as `shell: "{{which('bash')}}"`. If you are outside a Pinokio-managed shell and only need to inspect Pinokio's environment manually, use `pterm which <command>`, but do NOT copy that user-specific absolute path into launcher scripts.
- exists: Check whether a file or folder exists at the specified relative path (example: `"when": "{{!exists('app')}}"`). Can be used with the `when` attribute to determine a path's existence and trigger custom logic. Use relative paths and it will resolve automatically to the current execution folder. 
- running: Check whether a script file is running (example: `"when": "{{!running('start.js')}}"`). Can be used with the `when` attribute to determine a path's existence and trigger custom logic. Use relative paths and it will resolve automatically to the current execution folder. 
- os: Pinokio exposes the node.js os module through the os variable.
- path: Pinokio exposes the node.js path module through the os variable (example: `{{path.resolve(...)}}`

## System Capabilities
### Package Management (Use in Order of Preference)
The following package managers come pre-installed with Pinokio, so whenever you need to install a 3rd party binary, remember that these are available. Also, you can assume these are available and include the following package manager commands in Pinokio scripts:
1. **UV** - For Python packages (preferred over pip)
2. **NPM** - For Node.js packages  
3. **Conda** - For cross-platform 3rd party binaries
4. **Brew** - Mac-only fallback when other options unavailable
5. **Git** - Full access to git is available.
6. **Bun** - For managing bun packages
**Important:** Include all install commands in the install script for reproducibility.
### HTTPS Proxy Support
- All HTTP servers automatically get HTTPS endpoints
- Convention: `http://localhost:<PORT>` â†’ `https://<PORT>.localhost`
- Full proxy list available at: `http://localhost:2019/config/`
### Pterm Features:
- **Clipboard Access:** Read from or Write to system clipboard via pinokio Pterm CLI (`pterm clipboard` command.)
- **Notifications:** Send desktop alerts via pinokio pterm CLI (`pterm push` command.)
- **Script Testing:** Run launcher scripts via pinokio pterm CLI (`pterm start` command.)
- **File Selection:** Use built-in filepicker for user file/folder input (`pterm filepicker` command.)
- **Command Path Resolution:** Inspect the absolute path of any command as seen by Pinokio via `pterm which <command>`. Use this for debugging or external local tooling, especially when a helper process did not inherit Pinokio's `PATH`, for example `pterm which bash` on Windows. Do NOT hardcode the returned absolute path into launcher scripts; use `which()` or `kernel.which()` in the script itself instead.
- **Git Operations:** Clone repositories, push to GitHub
- **GitHub Integration:** Full GitHub CLI support (`gh` commands)

## Troubleshooting with Logs
Pinokio stores the logs for everything that happened in terminal at the following locations, so you can make use of them to determine what's going on:

### Log Structure
In case there is a `pinokio` folder in the project root folder, you should be able to find the logs folder here:

```
pinokio/
â””â”€â”€ logs/   # Direct user interaction logs
    â”œâ”€â”€ api/     # Launcher script logs (install.js, start.js, etc.)
    â”œâ”€â”€ dev/     # AI coding tool logs (organized by tool)
    â””â”€â”€ shell/   # Direct user interaction logs
```

Otherwise, the `logs` folder should be found at project root:

```
logs/
â”œâ”€â”€ api/     # Launcher script logs (install.js, start.js, etc.)
â”œâ”€â”€ dev/     # AI coding tool logs (organized by tool)
â””â”€â”€ shell/   # Direct user interaction logs
```

### Log File Naming
- Unix timestamps for each session
- Special "latest" file contains most recent session logs
- **Default:** Use "latest" files for current issues
- **Historical:** Use timestamped files for pattern analysis and the full history.

## Best practices
### 0. Always reference the logs when debugging
- When the user asks to fix something, ALWAYS check the logs folder first to check what went wrong. Check the "Troubleshooting with Logs" section.
### 1. Shell commands for launching programs
- Launch flags related
  - Try as hard as possible to minimize launch flags and parameters when launching an app. For example, instead of `python app.py --port 8610`, try to do `python app.py` unless really necessary. The only exception is when the only way to launch the app is to specify the flags.
- Launch IP related
  - Always try to find a way to launch servers at 127.0.0.1 or localhost, often by specifying launch flags or using environment variables. Some apps launch apps at 0.0.0.0 by default but we do not want this.
- Launch Port related
  - In case the app itself automatically launches at the next available port by default (for example Gradio does this), do NOT specify port, since it's taken care of by the app itself. Always try to minimize the amount of code.
  - If the install instruction says to launch at a specific port, don't use the hardcoded port they suggest since there's a risk of port conflicts. Instead, use Pinokio's `{{port}}` template expression to automatically get the next available port.
  - For example, if the instruction says `python app.py --port 7860`, don't use that hardcoded port since there might be another app running at that port. Instead, automatically assign the next available port like this: `python app.py --port {{port}}`
  - Note that the `{{port}}` expression always returns the next immediately available port for each step, so if you have multiple steps in a script and use `{{port}}` in multiple steps, the value will be different. So if you want to launch at the next available port and then later reuse that port, you will need to first use `{{port}}` to get the next available port, and save the value in local variable using `local.set`, and then use the `{{local.<variable_name>}}` expression later.
### 2. shell.run API
- When writing `shell.run` API requests, always use relative paths (no absolute paths) for the `path` field. For example, if you need to run a command from `app` folder, the `path` attribute should simply be `app`, instead of its full absolute path.
- If a launcher needs to use a command that Pinokio already provides, prefer resolving it with `{{which('command')}}` inside the script instead of assuming the command name will always be on `PATH`.
- Do NOT automatically avoid `bash`-based install commands on Windows. Pinokio's Windows environment includes `bash` through its bundled toolchain, so commands such as `curl -fsSL ... | bash` are acceptable when they run inside a Pinokio-managed shell and there is no simpler cross-platform alternative.
- If a Windows launcher needs to run the shell itself in bash instead of the default `cmd.exe`, set `shell: "{{which('bash')}}"` on the `shell.run` step.
- If a separate debugging process or external local tool did not inherit Pinokio's environment, you may use `pterm which <command>` to inspect what Pinokio would resolve. Do NOT turn that result into a hardcoded script path; for launcher scripts, always use `which()` or `kernel.which()` so the script stays reproducible across machines.
### 2. Package managers
- When installing python packages, try best to use `uv` instead of `pip` even if the install instruction says to use pip. Instead of `pip install -r requirements.txt`, you can simply use `uv pip install -r requirements.txt` for example. Even if the project's own README says use pip or poetry, first check if there's a way to use uv instead.
- When you need to install some global package, try to use `conda` as much as possible. Even on macs, `brew` should be only used if there are no `conda` options.
### 3. Minimal Always
- If you are starting with existing script files, before modifying, creating, or removing any script files, first look at `pinokio.js` to understand which script files are actually used in the launcher. The only script files used are the ones mentioned in the `pinokio.js` file. The `pinokio.js` file is the file that constructs the UI dynamically.
- Do not create a redundant script file that does something that already exists. Instead modify the existing script file for the feature. For example, do not create an `install.json` file for installation if `install.js` already exists. Instead, modify the `install.js` file.
- Pinokio accepts both JSON and JS script files, so when determining whether a script for a specific purpose already exists, check both JSON and JS files mentioned in the `pinokio.js` file. Do not create script files for rendundant purpose.
- When building launchers for existing projects cloned from a repository, try to stay away from modifying the project folder (the `C:\pinokio\api\ace-step-ui.pinokio.git` folder), even if installations are failing. Instead, try to work around it by creating additional files in the launcher folder, and using those files IN ADDITION to the default project.
  - The only exception when you may need to make changes to the project folder is when the user explicitly wants to modify the existing project. Otherwise if the purpose is to simply write a launcher, the app logic folder should never be touched.
- When running shell commands, take full advantage of the Pinokio `shell.run` API, which provides features like `env`, `venv`, `input`, `path`, `sudo`, `on`, etc. which can greatly reduce the amount of script code.
  - Python apps: Always use virtual environments via `venv` attribute. This attribute automatically creates a venv or uses if it already exists.
### 4. Try to support Cross-platform as much as possible
- Use cross-platform shell commands only.
- This means, prefer to use commands that work on all platforms instead of the current platform.
- If there are no cross platform commands, use Pinokio's template expressions to conditionally use commands depending on `platform`, `arch`, etc.
- Also try to utilize Pinokio Pterm APIs for various cross-platform system features.
- If it is impossible to implement a cross platform solution (due to the nature of the project itself), set the `platform`, `arch`, and/or `gpu` attributes of the `pinokio.json` file to declare the limitation.
- Pinokio provides various APIs for cross-platform way of calling commonly used system functions, or lets you selectively run commands depending on `platform`, `arch`, etc.
### 5. Do not make assumptions about Pinokio API
- Do NOT make assumptions about which Pinokio APIs exist. Check the documentation.
- Do NOT make assumptions about the Pinokio API syntax. Follow the documentation.
### 6. Scripts must be able to replicate install and launch steps 100%
- The whole point of the scripts is for others to easily download and invoke them via Pinokio interface with one click. Therefore, do not assume the end user's system state, and make everything self-contained.
- When a 3rd party package needs to be installed, or a 3rd party repository needs to be downloaded, include them in the scripts.
### 7 Dynamic UI rendering
- The `pinokio.js` launcher script can change dynamically depending on the current state of the script execution. Which means, depending on what the file returns, it can determine what the sidebar looks like at any given moment of the script cycle.
  - `info.exists(relative_path)`: The `info.exists` can be used to check whether a relative path (relative to the script root path) exists. The `pinokio.js` file can determine which menu items to return based on this value at any given moment.
  - `info.running(relative_path)`: The `info.running` can be used to check whether a script at a relative path is currently running (relative to the script root path) exists. The `pinokio.js` file can determine which menu items to return based on this value at any given moment.
  - `info.local(relative_path)`: The `info.local` can be used to return all the local variables tied to a script that's currently running. The `pinokio.js` file can determine which menu items to return based on this value at any given moment.
  - `default`: set the `default` attribute on any menu item for whichever menu needs to be selected by default at a given step. Some example scenarios:
    - during the install process, the `install.js` menu item needs to be set as the `default`, so it automatically executes the script
    - when launching the `start.js` menu item needs to be set as the `default`, so it automatically executes the script
    - after the app has launched, the `default` needs to be set on the web UI URL, so the user is sent to the actual app automatically.
  - Check the examples in the C:\pinokio\prototype\system\examples folder to see how these are being used.
### 8. No need for stop scripts
- `pinokio.js` does NOT need a separate `stop` script. Every script that can be started can also be natively stopped through the Pinokio UI, therefore you do not need a separate stop script for start script
### 9. Writing launchers for existing projects
- When writing or modifying pinokio launcher scripts, figure out the install/launch steps by reading the project folder `app`.
- In most cases, the `README.md` file in the `C:\pinokio\api\ace-step-ui.pinokio.git` folder contains the instructions needed to install and run the app, but if not, figure out by scanning the rest of the project files.
- Install scripts should work for each specific operating system, so ignore Docker related instructions. Instead use install/launch instructions for each platform.
### 10. Retrofitting an already-working setup
- Sometimes the user starts outside Pinokio, gets an app working through ad-hoc commands, and only later asks to turn that work into a Pinokio launcher.
- In this case, treat the current working setup and the successful session context as the highest priority source of truth. Do NOT restart from scratch if the app is already working.
- First capture the exact install and launch steps that already succeeded: cloned repositories, package manager commands, environment variables, model downloads, ports, working directories, helper scripts, and any fixes that were required.
- Then convert that knowledge into reproducible Pinokio scripts (`install.js`, `start.js`, `reset.js`, `update.js`, `pinokio.js`, `pinokio.json`) instead of telling the user to manually repeat the ad-hoc process.
- When the successful setup lives in a non-Pinokio folder, use that folder as evidence only. Resolve `PINOKIO_HOME` first, then produce the final launcher in the proper Pinokio location (`PINOKIO_HOME/api/<unique_name>` or `PINOKIO_HOME/plugin/<unique_name>`) unless the user explicitly asks for another layout.
- Replace machine-specific state with reproducible steps. Never hardcode absolute paths, user-specific cache locations, session-only ports, or one-off manual edits if they can be expressed in the launcher.
- Do not simply encode whatever happened to work on the current machine. Generalize the result into the broadest practical cross-platform, cross-machine launcher, and if limitations are unavoidable, declare them explicitly in `pinokio.json` instead of silently baking in local assumptions.
- If the app is already installed but the exact setup steps are partially missing, inspect the current working tree, generated files, dependency manifests, shell history when available, and logs to reconstruct the smallest reliable install and start flow.
- Verify from as clean a state as practical. A launcher is only done when another user could reproduce the working result without relying on undocumented steps from the original ad-hoc session.
### 11. Don't use Docker unless really necessary
- Some projects suggest docker as installation options. But even in these cases, try to find "development" options to launch the app without relying on Docker, as much as possible. We do not need Docker since we can automatically install and launch apps specifically for the user's platform, since we can write scripts that run cross platform.
### 12. pinokio.json
- Do not touch the `version` field since the version is the script schema version and the one pre-set in `pinokio.js` must be used.
- `icon`: It's best if we have a user friendly icon to represent the app, so try to get an image and link it from `pinokio.json`.
  - If the git repository for the `C:\pinokio\api\ace-step-ui.pinokio.git` folder points to GitHub (for example https://github.com/<USERNAME>/<REPO_NAME>`, ask the user if they want to download the icon from GitHub, and if approved, get the `avatar_url` by fetching `https://api.github.com/users/<USERNAME>`, and then download the image to the root folder as `icon.png`, and set `icon.png` as the `icon` field of the `pinokio.json`. 
### 13. Gitignore
- When a launcher involves cloning 3rd party repositories, downloading files dynamically, or some files to be generated, these need to be included in the .gitignore file. This may include things like:
  - Cloning git repositories
  - Downloading files
  - Dynamically creating files during installation or running, such as Sqlite Databases, or environment variables, or anything specific to the user.
- Make sure these file paths are included in the .gitignore file, and if not, include them in .gitignore.

## AI Libraries (Pytorch, Xformers, Triton, Sageattention, etc.)
If the launcher is for running AI models locally, the install script must declare the AI bundle so Pinokio can install the machine-level prerequisites before the script runs:

```
// install.js
module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    ...
  ]
}
```

This is required even when the script also uses `torch.js`. The AI bundle is what triggers installation of common local AI prerequisites such as CUDA on NVIDIA systems and Hugging Face CLI.

If the launcher has a dedicated built-in script named `torch.js`, it can be used as follows:

```
// install.js
module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "venv",                // Edit this to customize the venv folder path
        path: "app",
        message: [
          "uv pip install -r requirements.txt"
        ],
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          path: "app",
          venv: "venv",                // Edit this to customize the venv folder path
          // xformers: true   // uncomment this line if your project requires xformers
          // triton: true   // uncomment this line if your project requires triton
          // sageattention: true   // uncomment this line if your project requires sageattention
          // flashattention: true   // uncomment this line if your project requires flashattention
        }
      }
    },
  ]
}
```

The `torch.js` script also includes ways to install pytorch dependent libraries such as xformers, triton, sagetattention. If any of these libraries need to be installed, use the torch.js to install in order to install them cross platform.


## Quick Reference
### Essential Documentation
- **Pinokio Programming:** See `PINOKIO.md` at C:\pinokio\prototype\PINOKIO.md â†’ "Programming Pinokio" section
- **Dynamic Menus:** See `PINOKIO.md` at C:\pinokio\prototype\PINOKIO.md â†’ "Dynamic menu rendering" section  
- **CLI Commands:** See `PTERM.md` at C:\pinokio\prototype\PTERM.md
### Common Patterns
- **Python Virtual Env:** `shell.run` with `venv` attribute
- **Cross-platform Commands:** Always test on multiple platforms
- **Error Handling:** Check logs/api for launcher issues
- **GitHub Operations:** Use `gh` CLI for advanced GitHub features
## Development Principles
1. **Minimize Shell Usage:** Leverage API parameters instead of raw commands
2. **Maintain Separation:** Keep app logic and launchers separate
3. **Follow Conventions:** Match existing project patterns
4. **Test Thoroughly:** Use CLI to verify launcher functionality
5. **Document Changes:** Update relevant metadata and documentation

## Anchored Summary

### Objective
- Complete siteâ€‘wide audit: fix corrupted UTFâ€‘8 mojibake, eliminate stale Musik Produktiv references, add missing affiliate links, correct content/data mismatches, ensure EN/ES translation parity, and make new guides match old guides for Google ranking

### Work State
- **All previous fixes applied**: mojibake, Musik Produktiv removal, products affiliate links, SPA JSONâ€‘LD cleanup, beatâ€‘making recreation, iZotope RX 11 update, Soundtoys 5.5 Bundle image+rating
- **Meta description HTML injection**: fixed `stripHtml()` in `build-guides.js:210` + `js/app.js:166,677`
- **SEO audit**: fixed duplicate `(2026)` in title, OG title missing year, OG image dimensions to 1200Ã—630, missing description field on beatâ€‘making
- **Year removed from all titles**: deleted `yearTag`/`yearSuffix` logic from `build-guides.js`, removed year logic from `app.js`, removed `(2026)` from beatâ€‘making title in `guides.json`
- **Final audit fixes**: 7 Soundtoys rating mismatches in guides.json FAQ (4.8â†’4.5), 3 truncated ES FAQ translations (monitors Q1, plugins Q1, bestâ€‘interface Q4), price mismatches ATHâ€‘M50X â†’$169 + Yamaha Pacifica $299â†’$349
- **Price normalization session 2**: canonical = `data/products.json` (user decision): Ableton Suite $749â†’$799 (guides + ableton-vs-logic conclusion), Blues Junior IV $749â†’$699, Marshal DSL40CR $749â†’$999, Katana 50 $229â†’$259, Ableton tiers Intro $79/$149â†’$99/$349; 246 pages rebuilt, verified, committed as `9b41f9441`
- **Natural-language fixes session 3**: budget-mics paragraph rewrote (removed "$20 support system" inconsistency â€” real prices $20â€“40 basic cable, Mogami $53), removed the artificial "I've spent endless hours/incontables horas" intros (best-samplers-drum-computers + best-drum-machine, EN+ES), normalized **"computadora de baterÃ­a" â†’ "caja de ritmos"** (natural Spanish already used elsewhere; title, intro, sections, digitakt-ii-vs-tr8s, products.json desc)
- **Session flags/globes + disclaimer**: SHOP_FLAG map in build-guides.js (USA flag zZounds/UK flag Andertons/colored globe Reverb+G4M+MusicStore, unique clipPath IDs via FLAG_UID); globe final size 17Ã—17 va -4px; commits `5503323fc`,`ceba83aa2`,`f08b0990f`,`2c020d62e`,`c8f3e2f0f`,`2b690e21f`,`e3faa306b`
- **Disclaimer de precios estilo callout** (peticiÃ³n del usuario): `.guide-product-card-currency-note` ya NO es texto azul centrado; ahora es caja tipo `guide-callout` (border-left 4px #f59e0b, fondo rgba(245,158,11,.08), font 13px, **texto blanco**, display:flex con gap 7px). Texto: `<strong>âš ï¸ AtenciÃ³n:</strong>` (EN `âš ï¸ Attention:`) con strong nowrap+flex-shrink:0 y body en `<span class="shop-note-body">` (min-width:0) â†’ las lÃ­neas siguientes se alinean bajo el TEXTO, no bajo el signo. Wording final unificado en build-guides.js Y js/app.js: "Los precios pueden variar segÃºn tu geolocalizaciÃ³n; el total final se confirma en tu moneda local al pagar. Cada tienda aplica su propia polÃ­tica de envÃ­o: algunas envÃ­an totalmente gratis, otras cobran un costo de envÃ­o y otras ofrecen envÃ­o gratuito a partir de un importe mÃ­nimo de compra. AdemÃ¡s, algunas tiendas solo realizan envÃ­os dentro de EE.&nbsp;UU." (EN paralelo). "EE.&nbsp;UU." con nbsp para que no se separe. Frase "nosotros solo te mostramos el precio del producto" eliminada a peticiÃ³n del usuario. **SOLO UNA nota por pÃ¡gina**: la del bloque `${productCards}` tras las FAQs fue eliminada (redundante); queda Ãºnicamente la de lÃ­nea ~954 (tras las secciones, antes de la conclusiÃ³n), que acompaÃ±a los botones de compra. **MÃ³vil â‰¤768px**: media query apila la nota en block (strong display:block margin-bottom:4px) para evitar columna angosta
- **Fix scroll-lock al cambiar idioma (`tmgLangScroll`)**: el switch de idioma (build-guides.js ~892) guarda scrollY y navega; script temprano en `<head>` (~827) oculta el doc si hay posiciÃ³n guardada; bucle de restauraciÃ³n al final de cada guÃ­a fuerza `scrollTo(0,y)` por frames. ANTES: 90 frames sin escape â†’ pÃ¡gina "colgada" ~1.5s peleando con el scroll del usuario (peor en mÃ³vil). AHORA: mÃ¡x 48 frames + **se cancela al primer touchstart/wheel/mousedown/keydown** ({passive:true}) + tope duro `setTimeout(end,1500)` + visibility restaurado en end(). No tocar sin mantener estos tres escapes
- **Mismo fix en la HOME (`setLang`)**: js/app.js tenÃ­a el mismo bucle colgante (60 frames + segundo forcejeo en `load`) â†’ reemplazado por versiÃ³n con cancelaciÃ³n al primer touchstart/wheel/mousedown/keydown, tope 48 frames y setTimeout(end,1500) con `window.__tmgLangEnd` para llamadas rÃ¡pidas repetidas. **OJO: la home carga js/app.min.js, NO app.js** â€” el min estaba desactualizado (seguÃ­a mostrando el disclaimer viejo "Precios aproximadosâ€¦"); sincronizado a mano parcheando strings (no hay minifier JS en el repo; _build_min.js solo aplica patches al min). REGLA: todo cambio en app.js debe replicarse en app.min.js y verificar sintaxis con `new Function(fs.readFileSync(...))`. Commit `9ed492ad2`
- **Stat hero home**: "100+ / Products Tested" â†’ "**200+ / Products Researched**" (index.html stats-bar + stat1 en js/translations.js EN/ES ["Productos Analizados"] + js/translations.v4.min.js; tras tocar v4.min correr `node _update_v4hash.js` para el ?v= md5)
- **Mapa de afiliados (auditado y corregido)**: Gear4Music/MusicStore/Reverb = Awin (`awinmid=1117/63816/67144` + `awinaffid=2891111`); Andertons = Impact `?irgwc=1&irpid=7292297`; zZounds = CJ `anrdoezrs.net/click-101857888-10422044-1779394?url=`; Plugin Boutique `a_aid=6a01e859cbe1a` (**canÃ³nico**, 32 usos en products.json; el dropdown usaba un `65fd7463b5f28`+gclid viejo â†’ reemplazado en build-guides.js + index/deals/deals_es). Amazon: solo `tag=topmusicg-20`; **usuario dice que cambiÃ³ a OneLink pero NO existe ningÃºn link onelink/amzn.to en el repo â†’ pedirle la URL exacta**. **build-deals.js**: nueva `affWrap(store,url)` dentro de buildPage envuelve las URLs de las cards (tag, imagen, botÃ³n) segÃºn tienda; `cjz` ahora es idempotente (`&& u.indexOf('anrdoezrs.net')<0`) para no doble-envolver zZounds. Antes: las 21 ofertas de Andertons salÃ­an SIN afiliado. Verificar con grep de `irgwc=1&irpid=7292297` en deals.html
- **Buy buttons migration (TEST_SHOP_BTN en build-guides.js ~line 300)**: starter-studio done (ids 15,16,17,18,53,54,55,328,5,3,25,26,20,19). Mic session IN PROGRESS â€” comparativas top COMPLETAS: id 4 C414 XLII ($1,225/$1,199/$1,225/Â£893/Â£849/â‚¬772.30), id 2 U87 Ai ($3,750Ã—3+Â£3,008; G4M/MusicStore pendientes), id 1 SM7B ($439Ã—3/Â£381.50/Â£381.00/â‚¬389.00), id 50 SM58 ($109/$99/$109/Â£103.50/Â£103.00/â‚¬119.00 â€” musicstore link es variante SM58 SE con switch), id 51 MD421 Kompakt ($265.38/$279/$265.38/Â£225.00/â‚¬249.00; andertons sin verificar â†’ fila sin precio), id 52 RE20 ($449/$449/$449/Â£539/Â£549/â‚¬539). Price corrections user-reported: SM57 zzounds $109/musicstore â‚¬105, Scarlett musicstore â‚¬172, NT1 zzounds $214/g4m Â£184.75/musicstore â‚¬199, M50x zzounds $159/g4m Â£148/musicstore â‚¬149, HS8 zzounds $339.14/g4m Â£263/musicstore â‚¬289, Rokit7 g4m Â£199.25/musicstore â‚¬266, MDR7506 g4m Â£99/musicstore â‚¬89, SSL2+ musicstore â‚¬295
- **REGLA IVA Music Store**: mostrar precios SIN IVA (internacional en_OT/en_OE), que es lo que el usuario ve al hacer clic en el link afiliado. NO multiplicar por 1.19. Si la pagina de_DE muestra precio con IVA (ej. 105), dividir entre 1.19 para obtener el precio internacional (88.24). El link afiliado apunta a en_OT/EUR donde el precio es SIN IVA.
- **5 tiendas SIEMPRE**: shopButtonsTest renderiza las 5 tiendas siempre (zzounds/reverb/gear4music/andertons/musicstore). Schema TEST_SHOP_BTN ampliado: `urls: {store: url}` override, `na: [stores]` â†’ fila NO clicable "No disponible/Not Available" (fondo #262626) y `oos: [stores]` â†’ fila CLICABLE "Agotado/Out of stock" (mismo gris, link = search de la tienda sintetizado por getResolvedStores). **Contador del botÃ³n SIEMPRE = order.length (5) â€” REGLA FIJA del usuario** (`' (' + order.length + ')'` en build-guides.js). **Etiqueta del botÃ³n: `t('Comparar 5 tiendas', 'Compare 5 more stores')`** (antes "Todas/All buying options" â€” cambio del usuario porque Amazon no estÃ¡ en la lista; patrÃ³n Amazon). Ejemplos oos: id 26 MDR-7506 `oos:['andertons']` + urls.zzounds directo a `item--SNYMDR7506`; id 20 Rokit 7 G5 `oos:['andertons']` (Andertons no vende ninguno de los dos â€” confirmado). OJO: si un producto tiene el store en `excludeStores` en products.json, getResolvedStores no sintetiza URL â†’ fila Agotado con href="undefined"; quitar la exclusiÃ³n si se quiere link. Commits `38df46329`,`e5456f198`,`2dff87d05`,`acd33efa5`,`492df9eac`
- **Mic guides pendientes de migrar** (~55 ids sin botones): stage-mics 226-232, usb/streaming 194,195,196,197,276-299, wireless 91-95,249-254, shotgun 339-349, instrument 206-215
- **Precios Plugin Boutique verificados**: entradas TEST_SHOP_BTN para ids 28,29,30,32,60,61,62,63,118,119,121,122,123,238 con prices.pluginboutique (verificados con sesión US: GET /?chosen_country=US guarda cookie de sesión y luego el producto entrega data-layer view_item price en USD; query ?currency o cookies simples NO cambian la moneda geo-IP). Mercury movió URL a /product/81-Bundles/97-Various-Category/12539-Mercury (la vieja 1893 daba home). Melodyne 5 (id 120) sigue como link de búsqueda PB SIN precio: PB no tiene página única (variantes Essential/Assistant/Editor/Studio)
- **SESIÓN DAW migrada - primario Gear4Music sin Amazon**: storeChips ya NO excluye daw (siempre shopButtonsTest). En shopButtonsTest: isDaw/isLogic declaradas junto a getResolvedStores (evitar TDZ). DAW: primario azul = stores.gear4music con marca Quicksand 'Gear4music', filas = ['zzounds','reverb','andertons','musicstore'] SIN amazon ni gear4music duplicado. Logic Pro (stores.official): ÚNICO botón azul 'Tienda Oficial'/'Official Store' → apple.com/logic-pro, SIN more-button (eturn isLogic ? primaryBtn : primaryBtn+moreBtn). Sin precios aún en TEST_SHOP_BTN para ids 110-115 (usuario: no buscar precios, solo migrar). SPA helper simplificado: tmgStoreButtons ya no tiene gate daw. Verificado 12 guías daw ×2 idiomas: 0 chips viejos, 0 amazon en botones, dropdown correcto. Commits 5feafd370 (precios PB plugins + URL Mercury /12539), este session: daw
- **MIGRACIÃ“N COMPLETA de botones nuevos (sitio entero menos DAW/Plugins)**: `storeChips(p, lang)` en build-guides.js ahora renderiza shopButtonsTest para TODOS los productos salvo en las guÃ­as de categorÃ­a `daw` (gate con `CURRENT_GUIDE_CAT` seteado al inicio de `buildGuidePage`; esas 5 conservan chips viejos). Auto-entrada sin precios: `shopButtonsTest` tolera ausencia de TEST_SHOP_BTN (`cfg||{}`, `prices||{}`, cola `' - '+pPrice` condicional) â†’ filas clicables SIN precio hasta verificar tienda por tienda. **excludeStores â†’ fila "No disponible" automÃ¡tica** (`avail` y rama na ahora exigen URL resuelta; antes salÃ­a href="undefined"). SPA paridad: nuevo **js/shop-buttons.js** (TEST_SHOP_BTN + SHOP_LOGO_* + flags + shopButtonsTest + helper global `tmgStoreButtons(p)` con gate por currentGuideIdâ†’category) cargado en index.html ANTES de app.min.js; `renderProductCard` usa `(window.tmgStoreButtons && tmgStoreButtons(p)) || chips-viejos`. update-version.js estampa tambiÃ©n `shop-buttons.js?v=`. **REGENERAR js/shop-buttons.js tras cada cambio en shopButtonsTest/TEST_SHOP_BTN** (script `_make_shop_buttons_js.js` en temp extrae bloques balanceados de build-guides.js). Verificado: 2000 botones primarios + 584 filas NA en las guÃ­as migradas, 0 chips viejos fuera de excluidas, 0 href=undefined. **Pendiente**: llenar precios verificados por tienda producto-a-producto
- **SESIÃ“N PLUGINS migrada â€” primario Plugin Boutique**: en shopButtonsTest, si `p.category === 'plugins'` el botÃ³n azul primario es Plugin Boutique (`stores.pluginboutique`, precio `prices.pluginboutique`) y Amazon desaparece (getResolvedStores ya excluye amazon para plugins). Marca: "**PluginBoutique**" escrito JUNTO y solo "in" en negrita (`<span font-weight:400>Plug<span font-weight:900>in</span>Boutique</span>` â€” pedido literal del usuario); los no-plugin mantienen el wordmark Amazon con subrayado naranja. Las 6 guÃ­as de la sesiÃ³n plugins ya muestran botones nuevos (108 primarios PB Ã—2 idiomas, 0 chips, 0 links Amazon en cards; los 3 href amazon restantes por pÃ¡gina son del MENÃš nav New Releases, no tocar). pro-plugins (cat production) tambiÃ©n sale PB porque todos sus productos son plugins. AÃºn sin entradas TEST_SHOP_BTN de plugins â†’ botones sin precio hasta verificar pluginboutique producto a producto (14/15 tienen link PB en products.json). SPA regenerado con mismo gate (solo daw queda excluida). Commits `f716865ca` (migraciÃ³n total), este session: primario PB

- **SESIÃ“N PRECIOS REALES masiva (zZounds + Andertons)**: TEST_SHOP_BTN pasÃ³ de 34 a **265 entradas** (252 con precios, 43 con oos). Fuentes: zZounds vÃ­a **webfetch tool** (node/PS dan 403) en 16 chunks con subagentes + verificaciones puntuales; Andertons GRATIS vÃ­a `data/price-history.json` (`lastPrice` del bot auto-deals, fresco del dÃ­a; 175 ids con URL andertons aplicados). Formato `$X.XX`/`Â£X.XX` con comas de miles. **Cuidados**: precios con coma en el mapa ("3,750.00") producen `$NaN` â† sanitizar con `.replace(/[,\s]/g,'')` ANTES de formatear; el regex de reparaciÃ³n puede PEGAR entradas en una sola lÃ­nea (el `\s+` inicial se come el newline) â†’ regenerar el bloque entero con serializador propio al final. ContaminaciÃ³n entre chunks: X32 Compact heredÃ³ $250.74 del vecino MG10XU â†’ detectar con ratio vs catÃ¡logo ([0.55,1.5]) y re-verificar sospechosos. CÃ³digos zZounds muertos encontrados y arreglados en products.json: RODPROCASTâ†'RODPROCASTER ($229), BEYDT770PRO80â†'BEYDT770PRO250 ($199.99, variante consolidada); K&M 210/2=KMS2102050055 $108.99, RAT2=PRCRAT2 $119.99, iLoudMM Pro=IKMILOUDMMPRO $299.99 ya estaban. OOS zzounds nuevos: 138 X32 Compact, 145 XR18 (serie X Air fuera), 22 Genelec 8040B, 34 MPC One+ (sucesor Gen2 $799 es OTRO producto), 39 Aston Shield GN, 231 Audix OM7, 201 Ditto Looper (TC Electronic deslistada completa), 205 HeadRush MX5 (sucesor Flex Prime $499), 209 OC818. SSL BiG SiX real=$3,299.99 (catÃ¡logo decÃ­a $2,000, campo price desactualizado NO tocado). daw/plugins excluidos del merge. Regenerar shop-buttons.js tras el patch SIEMPRE. Commit `6b3004499`, versiÃ³n `3d772eo7`. Pendiente sin verificar: Gear4Music/MusicStore (403 total), Amazon, Reverb (aproximado)

### Blocked
- U87 (id 2): gear4music y musicstore sin precio (variante nickel no verificable; fetch directo 403)
- Gear4Music y Music Store: 403 en node, Invoke-WebRequest Y webfetch â†' imposible verificar sus precios esta sesiÃ³n

### Next Move
- Continue Andertons price verification for remaining ~100 products (batch 4+: ids 64-76, 124-131, 140-150, etc.)
- Rebuild guides after any further Andertons price updates
- Push all changes to origin/main

## âš ï¸ FIRST CHECK when page is broken

**Siempre verificar `css/style.min.css` primero.** Si el CSS estÃ¡ corrupto (todo pegado, sin `{}:;,.`), la causa es el bug de PowerShell `$1` al minificar inline. Correr `node _minify_css.js` para regenerarlo. No pierdas tiempo debugueando JS cuando el CSS estÃ¡ roto.

## Known Quick Fixes

### CSS rota (todos los `{}:;` desaparecen)
**Causa:** Minificar CSS con `node -e "..."` en PowerShell expande `$1` a vacÃ­o.
**Fix:** Siempre usar `node _minify_css.js` (nunca `node -e "..."` inline en PowerShell):
```js
var fs = require('fs');
var c = fs.readFileSync('css/style.css', 'utf8');
c = c.replace(/\/\*[\s\S]*?\*\//g, '');
c = c.replace(/\s*([{}:;,])\s*/g, '$1');
c = c.replace(/;\}/g, '}');
c = c.replace(/\s+/g, ' ');
c = c.trim();
fs.writeFileSync('css/style.min.css', c);
```

### Versiones desync (`app.min.js?v=` distinto a inline `v=`)
**Causa:** `build-guides.js` setea `app.min.js?v=` content-hash, `update-version.js` lo sobreescribe con random hash.
**Fix:** Correr `build-guides.js` primero, luego `npm run predeploy`. Verificar con:
```
grep -E "app\.min\.js\?v=|style\.min\.css\?v=" index.html
```

### Site roto despuÃ©s de deploy
**Causa:** Cloudflare cachea CSS/JS viejo.
**Fix:** Purgar Cloudflare cache (Speed > Purge Cache > Purge Everything) + hard refresh.

## â­ MANDATORY: Superar a la competencia en cada guÃ­a (SEO)

En cada guÃ­a que se toque o cree, SIEMPRE:
1. **Verificar la competencia primero** (MusicRadar, Sweetwater, B&H, gearank, SpecDB, etc.): quÃ© specs incluyen en sus tablas, quÃ© productos destacan, quÃ© preguntas responden.
2. **Superarla**: nuestra tabla/guÃ­a debe tener mÃ¡s specs verificadas, mÃ¡s precisas, mÃ¡s productos y mejor estructura que el competidor top.
3. **Datos oficiales del fabricante** â€” NUNCA inventar precios/specs. Buscar spec sheet oficial (Shure/AKG/Neumann/Rode/Sennheiser/EV, etc.).
4. **Tabla de comparaciÃ³n (`productTable`)** debe incluir: Producto, Precio, "Best For", y todas las specs clave que la competencia muestra (tipo, patrÃ³n polar, frecuencia, sensibilidad, ruido propio, max SPL, impedancia, + especÃ­ficas de la categorÃ­a: woofer/potencia/memoria/peso, etc.).
5. **Corregir errores factuales** detectados durante la verificaciÃ³n (ej. U 87 Ai Max SPL real = 117 dB, no 128 dB).
6. Rebuild + verificar EN/ES + commit + push.

## ðŸ’° REGLA FIJA: URLs + PRECIOS SIEMPRE JUNTOS

**SIEMPRE que se aÃ±ada o actualice una URL de tienda en `data/products.json`, TAMBIÃ‰N agregar el precio de esa tienda en `TEST_SHOP_BTN` dentro de `build-guides.js`** (y regenerar `js/shop-buttons.js` despuÃ©s). Esto aplica para TODAS las tiendas: zzounds, andertons, musicstore, gear4music, amazon, reverb, pluginboutique.

- Si no se encuentra el precio, agregar la entrada URL SIN precio (el botÃ³n mostrarÃ¡ solo el link sin precio) pero INTENTAR encontrar el precio siempre.
- DespuÃ©s de agregar precios, regenerar shop-buttons.js: `node temp/gen-shop-buttons.js`
- DespuÃ©s de todo, reconstruir guides: `node build-guides.js`
- NUNCA olvidar el precio al agregar un link. Esto es una REGLA PERMANENTE.
- **Music Store SIEMPRE en euros (€)** — NUNCA en dólares ($). Music Store es tienda europea (Alemania), todos sus precios son EUR.
- **Music Store SIN IVA**: los precios en TEST_SHOP_BTN deben ser SIN IVA (precio internacional en_OT/en_OE). El link afiliado apunta a la pagina internacional donde el usuario ve el precio sin IVA. NO multiplicar por 1.19. Si el precio viene de la pagina de_DE (con IVA), dividir entre 1.19.
- **Gear4Music SIN IVA**: los precios de Gear4Music en TEST_SHOP_BTN deben ser SIN IVA (precio ex-VAT). Las páginas de G4M UK muestran "Price Includes VAT @ 20%". Dividir entre 1.20 para obtener el precio ex-VAT. **EXCEPCIÓN**: si el usuario ve el£62.00 desde otra ubicación, usar ese precio.
- **Precios descoordinados = probable error**: Si el precio de una tienda es drásticamente diferente al de las otras tiendas (ej. €50 vs $299/£259), el precio está MAL y debe verificarse en la tienda real antes de usarlo. SIEMPRE comparar coherencia entre tiendas.
- **Traducciones literales = probable error**: Evitar traducciones word-for-word del inglés que suenan raras en español. Ejemplos: "grabar a un DAW" → "grabar en un DAW", "via USB" → "vía USB", "grabacion" → "grabación" (con tilde), "tambien" → "también" (con tilde). Revisar que el texto suene natural en español, no como una traducción literal del inglés.
- **"IA" SIEMPRE en mayúsculas**: En español, "Inteligencia Artificial" se abrevia "IA" (ambas mayúsculas). NUNCA "iA". Aplica a títulos, headings, y contenido ES.
- **Deploy a la web**: Después de push, verificar GitHub Pages con `gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds -X POST` y monitorear con `gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds/latest`. El status debe ser "built".

## 📋 Pendiente para mañana
- **Auditoría de traducciones ES literales**: Buscar en guides.json y build-guides.js traducciones word-for-word del inglés que suenan raras en español. Buscar patrones como "a un DAW", "via USB", "grabacion" sin tilde, "tambien" sin tilde, "Seleccion", "conexion", "opcion", "informacion", "solucion", "Version", "condicion", "razon", "frecuencia", etc. También buscar frases como "es el mejor para" (mejor usado como "es ideal para" o "es la mejor opción para").
- **Guía DI Box (category: accessories)**: 7 productos (Radial J48 MK2, Rupert Neve RNDI, Tech 21 SansAmp Bass Driver DI v2, Radial ProD2, Walrus Audio Canvas Mono, Whirlwind IMP 2, LR Baggs Para Acoustic DI). Tabla por instrumento, regla "Los opuestos se atraen" (Activa/Pasiva), fotos Gear4Music, FAQs humanas, pros/cons reales. Investigar precios y URLs verificadas.
- **VS Radial J48 vs Rupert Neve RNDI (category: accessories)**: Transparencia vs Color Armónico. Tabla comparativa agresiva, ángulos de venta por modelo (J48 = headroom vivo, RNDI = saturación armónica estudio), veredicto tajante. Fotos Gear4Music, FAQs humanas, specs verificadas del fabricante.

## ðŸ–¼ï¸ REGLA FIJA: AÃ±adir productos al catÃ¡logo (`data/products.json`)

**SIEMPRE que se aÃ±ada un producto nuevo al catÃ¡logo, seguir este orden exacto (NO repetÃ­rselo al usuario):**

1. **Buscar la imagen PRIMERO en Gear4Music** (patrÃ³n `https://r2.gear4music.com/media/.../1200/preview.jpg`). Sacar la URL del `og:image` de la pÃ¡gina del producto en gear4music.com. Usar la imagen de Amazon SOLO si Gear4Music no tiene el producto.
2. **Buscar los links de tiendas con el mÃ©todo Google**: buscar en Google el nombre del producto + el nombre de la tienda (ej. `Rode NT1 Signature zzounds`, `Rode NT1 Signature gear4music`, `Rode NT1 Signature amazon`). Verificar que la URL es la pÃ¡gina real del producto (no una bÃºsqueda genÃ©rica).
3. **Tiendas a completar cuando existan**: `gear4music`, `amazon`, `zzounds` (patrÃ³n `https://www.zzounds.com/a--925521/item--<CODE>`), `andertons` (patrÃ³n `https://www.andertons.co.uk/<slug>/`), `musicstore`, `reverb`. Solo incluir las que tengan el producto verificado.
4. **NUNCA inventar URLs ni ASINs** â€” todas deben salir de la bÃºsqueda real (mÃ©todo del punto 2).
5. Precio y specs siempre verificados con datos reales de la tienda/fabricante (regla de la secciÃ³n SEO).

## ðŸŽ¯ Ofertas (deals.html / deals_es.html) â€” AUTOMÃTICO (cron)

La pÃ¡gina de Ofertas ahora se actualiza **sola** vÃ­a GitHub Actions:
- **`auto-deals.js`**: aprende precios reales de Andertons (JSON-LD `Product.offers.price`) para los 147 productos con link de Andertons en `data/products.json`. Mantiene historial en `data/price-history.json` (baseline = primera visita). Cuando el precio baja â‰¥5% del `normal`, crea la oferta (`price` real, `old_price` = precio normal anterior, badge "Save Â£X/Ahorra Â£X"); cuando vuelve a precio normal, la **elimina automÃ¡ticamente**. DespuÃ©s corre `build-deals.js` y genera `deals.html` (EN) + `deals_es.html` (ES).
- **`.github/workflows/auto-deals.yml`**: cron 4Ã—/dÃ­a (UTC 1,7,13,19 + `workflow_dispatch`). Corre `node auto-deals.js`, commitea y pushea los cambios con el token `GITHUB_TOKEN`. El push dispara el purge de Cloudflare (`purge-cache.yml`).
- **`data/manual-deals.json`**: ofertas verificadas a mano por el bot en sesiÃ³n (bÃºsqueda web real en las tiendas). Se fusionan en cada corrida y NO se sobrescriben. Para aÃ±adir/quitar una oferta manual, editar este archivo y correr `node auto-deals.js` (o esperar el cron).

**Reglas (NO QUEBRANTAR):**
- `auto-deals.js` NUNCA inventa precios: solo lee lo que devuelve la tienda (Andertons JSON-LD). Las rebajas detectadas son caÃ­das reales de precio observadas en el tiempo. La primera corrida no genera ofertas auto (baseline = precio actual); las detecta en corridas siguientes.
- Las tiendas que dan 403 a bots (Sweetwater, Gear4Music, Music Store, Reverb, B&H) NO se scrapean; si un dÃ­a Andertons da 403, el bot conserva `data/deals.json` anterior (el workflow usa `git add -A` solo si hay cambios reales).
- `data/manual-deals.json` solo con precios verificados reales vistos en las tiendas (regla del sitio: nunca inventar precios/descuentos).
- `data/price-history.json` es la memoria del bot; se versiona en el repo para que el historial persista entre corridas.

**Chequeo manual:** `node auto-deals.js` â†’ verifica en `deals.html`/`deals_es.html`: header completo + `bg-hero` + botÃ³n azul `guide-back-btn` + cuadrÃ­cula + precio original tachado (`text-decoration: line-through`) + iconos de las 7 tiendas + hreflang/canonical por idioma.
