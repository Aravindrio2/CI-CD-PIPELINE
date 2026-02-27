pipeline {

    agent any

    environment {
        KUBECONFIG = "C:\\ProgramData\\Jenkins\\.kube\\config"
        DOCKER_IMAGE = "aravindrio7/ci-cdpipelines:latest"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/Aravindrio2/CI-CD-PIPELINE.git',
                branch: 'main'
            }
        }

        stage('Build Image') {
            steps {
                bat "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Push Docker Hub') {
            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    bat """
                    docker login -u %USER% -p %PASS%
                    docker push ${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                bat """
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml

                kubectl rollout restart deployment ci-cdpipelines
                kubectl rollout status deployment ci-cdpipelines
                """
            }
        }

        stage('Show URL') {
            steps {
                bat "minikube service ci-cdpipelines --url"
            }
        }
    }

    post {
        success {
            echo "PIPELINE SUCCESS ✅"
        }

        failure {
            echo "PIPELINE FAILED ❌"
        }
    }
}
