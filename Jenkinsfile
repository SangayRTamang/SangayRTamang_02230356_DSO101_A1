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
                echo 'Deploy stage - Docker not configured in Jenkins environment'
            }
        }
    }
}