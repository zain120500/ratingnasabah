npx nuxi generate --dotenv .env
cd .output/public
zip -r pgiweb.zip ./
# scp web.zip pgiweb@hris-dev.pgindonesia.com:
# echo "Web zip deployed!"
# cd ../..
# rm -rf .output
# rm dist