pipeline {
    agent any
  
    stages {
        stage('Build') { 
            steps {
                echo 'Building'
                nodejs('npm') {
                    npm install
                    npm run build
                }
            }
        }
        stage('Test') { 
            steps {
                echo 'Testing'
                nodejs('npm') {
                    npm run test
                }
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
