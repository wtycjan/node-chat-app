pipeline {
    agent any
  
    stages {
        stage('Build') { 
            steps {
                echo 'Building'
                sh 'git pull origin master'
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
                expression {"SUCCESS".equals(currentBuild.currentResult)}
            }
            steps {
                echo 'Testing'
                nodejs('npm') {
                    sh 'npm run test'
                }
            }
        }

	 stage('Deploy') {
            steps {
                echo 'Deploying..'
		sh 'docker build -t komunikator-deploy Dockerfile .'
            }
	   post {
		success {
		    emailext attachLog: true,
		        body: "${currentBuild.currentResult} in job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
		        recipientProviders: [developers(), requestor()],
		        to: 'wtycjan@gmail.com',
		        subject: "JENKINS successful deploy"
		}
		failure {
		    emailext attachLog: true,
		        body: "${currentBuild.currentResult} in job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
		        recipientProviders: [developers(), requestor()],
		        to: 'wtycjan@gmail.com',
		        subject: "JENKINS deploy failed"
		}
		
	 }
	}
   }        
 }
    
    



