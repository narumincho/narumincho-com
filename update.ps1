npx.ps1 tsc

node.exe ./jsOutDir/index.js

Remove-Item ./jsOutDir -Recurse

# firebase deploy --project narumincho-homepage