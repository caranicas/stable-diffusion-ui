Common issues and their solutions. If these solutions don't work, please feel free to ask at the [discord server](https://discord.com/invite/u9yhsFmEkB) or [file an issue](https://github.com/cmdr2/stable-diffusion-ui/issues).

## RuntimeError: CUDA out of memory
This can happen if your PC has less than 6GB of VRAM.

Try disabling the "Turbo mode" setting under "Advanced Settings", since that takes an additional 1 GB of VRAM (to increase the speed).

Additionally, a common reason for this error is that you're using an initial image larger than 768x768 pixels. Try using a smaller initial image.

Also try generating smaller sized images.

## urllib.error.URLError: <urlopen error [Errno 11001] getaddrinfo failed>
This can be due to a Firewall/Antivirus/Proxy/VPN blocking your network connections. Please check those.

Another solution is to switch to Google's DNS server: https://developers.google.com/speed/public-dns/docs/using#windows or Cloudflare's DNS server: https://developers.cloudflare.com/1.1.1.1/setup/windows/

## basicsr module not found
For Windows: Please download and extract basicsr from [here](https://github.com/cmdr2/stable-diffusion-ui/releases/download/v2.16/basicsr-win64.zip), and place the `basicsr` folder inside the `stable-diffusion-ui\stable-diffusion\env\lib\site-packages` folder. Then run the `Start Stable Diffusion UI.cmd` file again.

For Linux: Please contact on the [discord server](https://discord.com/invite/u9yhsFmEkB).

## No ldm found, or antlr4 or any other missing module, or ClobberError: This transaction has incompatible packages due to a shared path
On Windows, please ensure that you had placed the `stable-diffusion-ui` folder after unzipping to the root of C: or D: (or any drive). For e.g. `C:\stable-diffusion-ui`. **Note:** This has to be done **before** you start the installation process. If you have already installed (and are facing this error), please delete the installed folder, and start fresh by unzipping and placing the folder at the top of your drive.

This error can also be caused if you already have conda/miniconda/anaconda installed, due to package conflicts. Please open your Anaconda Prompt, and run `conda clean --all` to clean up unused packages.

If nothing works, this could be due to a corrupted installation. Please try reinstalling this, by deleting the installed folder, and unzipping from the downloaded zip file.

## Killed uvicorn server:app --app-dir ... --port 9000 --host 0.0.0.0
This happens if your PC ran out of RAM. Stable Diffusion requires a lot of RAM, and requires atleast 10 GB of RAM to work well. You can also try closing all other applications before running Stable Diffusion UI.

## Green image generated
This usually happens if you're running NVIDIA 1650 or 1660 Super. To solve this, please close and run the Stable Diffusion command on your computer. If you're using the older Docker-based solution (v1), please upgrade to v2: https://github.com/cmdr2/stable-diffusion-ui/tree/v2#installation

If you're still seeing this error, please try enabling "Full Precision" under "Advanced Settings" in the Stable Diffusion UI.

## './docker-compose.yml' is invalid:
> ERROR: The Compose file './docker-compose.yml' is invalid because:
> services.stability-ai.deploy.resources.reservations value Additional properties are not allowed ('devices' was unexpected)

Please ensure you have `docker-compose` version 1.29 or higher. Check `docker-compose --version`, and if required [update it to 1.29](https://docs.docker.com/compose/install/). (Thanks [HVRyan](https://github.com/HVRyan))

## RuntimeError: Found no NVIDIA driver on your system:
If you have an NVIDIA GPU and the latest [NVIDIA driver](http://www.nvidia.com/Download/index.aspx), please ensure that you've installed [nvidia-container-toolkit](https://stackoverflow.com/a/58432877). (Thanks [u/exintrovert420](https://www.reddit.com/user/exintrovert420/))

## Some other process is already running at port 9000 / port 9000 could not be bound
You can override the port used. Please change `docker-compose.yml` inside the project directory, and update the line `9000:9000` to `1337:9000` (where 1337 is whichever port number you want).

After doing this, please restart your server, by running `./server restart`.

After this, you can access the server at `http://localhost:1337` (where 1337 is the new port you specified earlier).

## RuntimeError: CUDA error: unknown error
Please ensure that you have an NVIDIA GPU and the latest [NVIDIA driver](http://www.nvidia.com/Download/index.aspx), and that you've installed [nvidia-container-toolkit](https://stackoverflow.com/a/58432877).

Also, if you are using WSL (Windows), please ensure you have the latest WSL kernel by running `wsl --shutdown` and then `wsl --update`. (Thanks [AndrWeisR](https://github.com/AndrWeisR))

# For support queries
## Entering a conda environment in an existing installation
This will give you an activated conda environment in the terminal, so you can run commands and force-install any packages, if required.

Users don't need to have the Anaconda Prompt installed to do this anymore, since the installer bundles a portable version of conda inside it. Just follow these steps.

**Windows:**
1. Open the terminal: Press Win+R, type "cmd", and press "Run"
2. Type `cd C:\stable-diffusion-ui` and press enter (or wherever you've installed it)
3. Type `installer\Scripts\activate.bat` and press enter
4. Type `cd stable-diffusion` and press enter
5. Type `conda activate .\env` and press enter
6. Type `python --version` and press enter. You should see 3.8.5.

**Linux:**
1. Open the terminal
2. Type `cd /path/to/stable-diffusion-ui` and press enter
3. Type `installer/bin/activate` and press enter
4. Type `cd stable-diffusion` and press enter
5. Type `conda activate ./env` and press enter
6. Type `python --version` and press enter. You should see 3.8.5.

This will give you an activated conda environment. To confirm, type `python --version` and press enter. You should see 3.8.5.
