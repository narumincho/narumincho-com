npx.ps1 tsc --project ./source/tsconfig.json

node.exe ./jsOutDir/index.js

Remove-Item ./jsOutDir -Recurse

# firebase deploy --project narumincho-homepage