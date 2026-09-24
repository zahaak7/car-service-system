pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '========================================='
                echo 'STAGE 1: CHECKOUT'
                echo '========================================='
                echo 'Code has been checked out from GitHub.'
                echo 'Listing files in the workspace:'
                bat 'dir'
            }
        }

        stage('Build') {
            steps {
                echo '========================================='
                echo 'STAGE 2: BUILD'
                echo '========================================='
                echo 'Simulating build process...'
                bat 'echo Build completed successfully'
            }
        }

        stage('Test') {
            steps {
                echo '========================================='
                echo 'STAGE 3: TEST'
                echo '========================================='
                echo 'Simulating test execution...'
                bat 'echo All tests passed successfully'
            }
        }
    }

    post {
        success {
            echo '========================================='
            echo 'PIPELINE FINISHED: SUCCESS'
            echo '========================================='
        }
        failure {
            echo '========================================='
            echo 'PIPELINE FINISHED: FAILED'
            echo '========================================='
        }
    }
}
