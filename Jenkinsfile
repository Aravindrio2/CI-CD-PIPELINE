pipeline {

    agent any

    environment {
        KUBECONFIG = "C:\\ProgramData\\Jenkins\\.kube\\config"
        DOCKER_IMAGE = "aravindrio7/ci-cdpipelines:latest"
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

                    bat """
                    echo %PASS% | docker login -u %USER% --password-stdin
                    docker push ${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                bat """
                echo Checking Minikube status...

                minikube status | find "Running"
                if %ERRORLEVEL% NEQ 0 (
                    echo Minikube not running. Starting now...
                    minikube start
                ) else (
                    echo Minikube already running. Skipping start.
                )

                kubectl get nodes

                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml

                kubectl rollout restart deployment ci-cdpipelines
                kubectl rollout status deployment ci-cdpipelines
                """
            }
        }

        stage('Show Application URL') {
            steps {
                bat """
                echo ==================================
                echo Application Access URL
                echo ==================================

                minikube service ci-cdpipelines --url
                """
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline Success"
        }

        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
