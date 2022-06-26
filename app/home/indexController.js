(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeIndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
        }
    }

})();