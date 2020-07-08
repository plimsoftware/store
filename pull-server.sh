git add .
git commit -am "Stock Orders final"
git push store master
ssh agenda.plimsoftware.pt \
  'git -C /home/miguel/storeproj/store/ ' \
  'pull store master && ' \
  'npm run build && ' \
  'sudo systemctl restart nginx'
