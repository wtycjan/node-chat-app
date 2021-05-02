pipeline {
    agent any 
  
    stages {
        stage('Build') { 
            steps {
                sh '''
                echo 'Building...'
                curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                chmod +x /usr/local/bin/docker-compose
                docker --version
                docker-compose --version
                ls
                '''
            }
        }
        stage('Test') { 
            steps {
                sh '''
                echo 'Testing..'
                docker-compose build --no-cache
                '''
            }
        }
    }

    post {
        failure {
            echo 'Success'
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'wtycjan@gmail.com',
                subject: "Build failed in Jenkins"
        }
        success {
            echo 'Fail'
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'wtycjan@gmail.com',
                subject: "Successful build in Jenkins"
        }
    }
}
