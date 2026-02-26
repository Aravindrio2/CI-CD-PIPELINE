pipeline {

    agent any

    environment {
        KUBECONFIG = 'C:\\ProgramData\\Jenkins\\.kube\\config'
        DOCKER_IMAGE = 'aravindrio7/ci-cdpipelines:latest'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Aravindrio2/CI-CD-PIPELINE.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE} ."
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
                    docker push aravindrio7/ci-cdpipelines:latest
                    '''
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                bat '''
                if not exist "C:\\ProgramData\\Jenkins\\.kube" mkdir "C:\\ProgramData\\Jenkins\\.kube"
                copy /Y C:\\Users\\Aravind\\.kube\\config C:\\ProgramData\\Jenkins\\.kube\\config
                kubectl get nodes
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                kubectl rollout status deployment/ci-cdpipelines --timeout=120s
            
                '''
            }
        }

    }
}
