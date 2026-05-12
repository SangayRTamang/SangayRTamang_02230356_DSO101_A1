pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/SangayRTamang/SangayRTamang_02230356_DSO101_A1.git',
                    credentialsId: 'github-greds'
            }
        }
        stage('Install Backend') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Install Frontend') {
            steps {
                dir('todo-app/frontend') {
                    bat 'npm install'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('todo-app/frontend') {
                    bat 'npm run build'
                }
            }
        }
        stage('Test Backend') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm test'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.build('sangayrinchentamang/be-todo:02240356')
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        docker.image('sangayrinchentamang/be-todo:02240356').push()
                    }

                    docker.build('sangayrinchentamang/fe-todo:02240356')
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        docker.image('sangayrinchentamang/fe-todo:02240356').push()
                    }
                }
            }
        }
    }
}