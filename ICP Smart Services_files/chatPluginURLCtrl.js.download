mainApp.controller('chatPluginURLCtrl', ['$rootScope', '$scope', 'serviceTransactionService', '$state',
    function ($rootScope, $scope, serviceTransactionService, $state) {
        $scope.currentPage = 1;
        $scope.isError = false;
        $scope.closechat = true;
        $rootScope.CurrentController(['shared']);
        var lang = 'EN';
        var introMessage = 'Hello. How may I help you?';
        if (localStorage.currentLanguage) {

            if (localStorage.currentLanguage == 'ar') {
                lang = 'AR';
                var introMessage = 'مرحبا. كيف يمكنني مساعدتك؟';
            }
        }

        $scope.chatControl = function () {
            if (!$scope.closechat) {
                $scope.closechat = true;
            }

        }

        $scope.init = function () {
            var chatConfig = {
                // Web chat application URL
                webchatAppUrl: 'https://apps.mypurecloud.ie/webchat',

                // Web chat service URL
                webchatServiceUrl: 'https://realtime.mypurecloud.ie:4431',

                // Numeric organization ID
                orgId: 9295,

                // Organization name. Replace with your org name.
                orgName: 'TAHALUF',
                // Requested agent language skill (Agent must have this language skill to receive chat)
                // language: 'English - Written',

                // Requested agent skills (Agent must have these skills to receive chat)
                // skills: ['Computers', 'Printers'],
                // OR
                //skills: [],

                // Priority
                priority: 0,

                // Queue Name
                queueName: 'MOI Chat-' + lang,

                // Target agent email (OPTIONAL)
                //agentEmail: 'alex.agent@example.com',

                // Whether to show submit button or send message on Enter keypress
                showSubmitButton: true,

                // Log level
                logLevel: 'DEBUG',

                // Locale code
                locale: 'en',

                // Whether to allow reconnects
                reconnectEnabled: true,

                //Allowed reconnect origins
                // reconnectOrigins: ['https://example.com', 'https://help.example.com', 'https://shop.example.com'],

                // Logo used within the chat window
                companyLogoSmall: {
                    width: 149,
                    height: 149,
                    url: 'https://dhqbrvplips7x.cloudfront.net/webchat/1.0.23/company-logo-small-9c9fe09b.png'
                },
                // Fallback image used for agent if no agent image is defined in the agent's PureCloud profile
                agentAvatar: {
                    width: 462,
                    height: 462,
                    url: 'https://dhqbrvplips7x.cloudfront.net/webchat/1.0.23/agent-e202505f.png'
                },

                // Text displayed with chat window is displayed
                welcomeMessage: introMessage,

                // CSS class applied to the chat window
                cssClass: 'webchat-frame',

                // Custom style applied to the chat window
                css: {
                    width: '100%',
                    height: '100%'
                }


            };
            var chatButton = document.getElementById('chat-button');

            // Required if reconnects are enabled
            window.PURECLOUD_WEBCHAT_FRAME_CONFIG = {
                containerEl: 'chat-container'
            };

            ININ.webchat.create(chatConfig)
                .then(function (webchat) {
                    // Optionally use isAutoJoined if reconnects are enabled
                    if (webchat.isAutoJoined()) {
                        // Do something to disable chat button
                    }
                    chatButton.onclick = function () {
                        if (!$scope.chatForm.$valid) {
                            $scope.isError = true;
                            return false;
                        }
                        $scope.isError = false;
                        var firstName = document.getElementById('name').value;
                        var lastName = '';
                        var agentEmail = '';

                        // Use getConfig.setConfigProperty() for any web chat configuration property to dynamically set config values.
                        webchat.getConfig().setData({
                            firstName: firstName,
                            lastName: lastName
                        });
                        webchat.getConfig().setAgentEmail(agentEmail);
                        // Alternatively, call webchat.renderPopup here. Note that reconnects do not apply to popup chat.
                        /* webchat.renderFrame({
                             containerEl: 'chat-container'
                         });*/
                        webchat.renderPopup({
                            width: 400,
                            height: 400,
                            title: 'Chat',
                            //set newTab to true if using screen share
                            newTab: false,

                        });
                    };
                })
                .catch(function (err) {
                    console.log(err);
                });
        };
    }]);