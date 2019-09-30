Set-Location .\source

tsc.cmd

node.exe jsOutDir/index.js

Remove-Item jsOutDir -Recurse

# cleancss style.css -o hosting_root/style.css -d

# firebase deploy --project narumincho-homepage