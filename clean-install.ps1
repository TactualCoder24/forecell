# Stop any running Node.js processes
taskkill /F /IM node.exe /T 2>$null

# Remove node_modules and package-lock.json
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue node_modules
Remove-Item -Force -ErrorAction SilentlyContinue package-lock.json
Remove-Item -Force -ErrorAction SilentlyContinue pnpm-lock.yaml
Remove-Item -Force -ErrorAction SilentlyContinue yarn.lock

# Clear npm cache
npm cache clean --force

# Install dependencies
npm install

Write-Host "Clean installation completed successfully!" -ForegroundColor Green
