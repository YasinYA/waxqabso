#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'develop' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  git clone https://github.com/YasinYA/wax-qabso.git
  cd wax-qabso

  docker-compose -f docker-compose-prod.yml pull
  docker-compose -f docker-compose-prod.yml up
else
  echo "Not deploying, since this branch isn't develop."
fi