pipeline {

    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Aravindrio2/CI-CD-PIPELINE.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t aravindrio7/ci-cd-pipeline:latest .'
            }
        }

        stage('Login & Push Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    bat '''
                    echo %PASS% | docker login -u %USER% --password-stdin
                    docker push aravindrio7/ci-cd-pipeline:latest
                    '''
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                bat '''
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                timeout /t 10
                kubectl get pods
                kubectl get svc
                '''
            }
        }

    }
}
