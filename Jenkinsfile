pipeline {
    agent any
  
    stages {
        stage('Build') { 
            steps {
                echo 'Building'
                nodejs('npm') {
                    sh 'npm install'
                }
                emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'wtycjan@gmail.com',
                subject: "Build result"
                
            }
        }
        stage('Test') { 
            when{
                expression {currentBuild.result == 'SUCCESS' }
            }
            steps {
                echo 'Testing'
                nodejs('npm') {
                    sh 'npm run test'
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
