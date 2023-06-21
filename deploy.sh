#! /bin/sh

set -e

npm run docs:build:staging

zip -r md.zip ./md

scp -i ~/vipsunwei.pem $PWD/md.zip ec2-user@13.125.196.197:/home/ec2-user/nginx/html/

rm -f $PWD/md.zip

ssh -i ~/vipsunwei.pem ec2-user@13.125.196.197 "rm -rf nginx/html/md.bak && mv nginx/html/md nginx/html/md.bak && unzip nginx/html/md.zip -d nginx/html/ && rm -f nginx/html/md.zip && exit"
