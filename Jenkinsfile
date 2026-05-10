pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SangayRTamang/SangayRTamang_02230356_DSO101_A1.git',
                    credentialsId: 'github-creds'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'junit.xml'
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