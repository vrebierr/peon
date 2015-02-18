'use strict';

angular.module('peon')
    .controller('SettingsCtrl', function ($scope, clients, bills, Auth) {
        $scope.bills = bills;
        $scope.clients = clients;
        $scope.user = Auth.getUser();

        $scope.currencies = [{id:0, value:'$'},{id:1, value:'€'}];
        $scope.types = [{id:0, value:'-'},{id:1, value:'%'}];
        $scope.time_beetween_taxes = [{time:1},{time:3},{time:6},{time:12}];

      /* #Update Settings
      ================================================== */

        $scope.updateSettings = function () {
            $scope.user.put().then(function (res) {
                $state.go('dashboard');
            });
        };

        $scope.onFileSelect = function ($files) {
            console.log($files);
        };

      /* #Add lines
      ================================================== */

        $scope.addPrestation = function() {
           var newTest = {id: $scope.settingsCpy.prestations.length + 1, name: "", quantity: "", price: "", isDefault: true};
           $scope.settingsCpy.prestations.push(newTest);
        };

        $scope.deletePrestation = function(object) {
            for(var i=0; i<$scope.settingsCpy.prestations.length;i++) {
                if ($scope.settingsCpy.prestations[i].id == object.id) {
                    $scope.settingsCpy.prestations.splice(i, 1);
                    return;
                }
            }
        };

        $scope.addReduction = function() {
           var newTest = {id: $scope.settingsCpy.reductions.length + 1, name: "", price: "", type:0, isDefault: true};
           $scope.settingsCpy.reductions.push(newTest);
        };

        $scope.deleteReduction = function(object) {
            for(var i=0; i<$scope.settingsCpy.reductions.length;i++) {
                if ($scope.settingsCpy.reductions[i].id == object.id) {
                    $scope.settingsCpy.reductions.splice(i, 1);
                    return;
                }
            }
        };

      /* #LoadImg -- EN CHANTIER --
      ================================================== */

        window.ondrop = window.ondragover = function(e) {e.preventDefault(); return false;};

        var el = document.querySelector('#drop');
        el.ondragover = function() {
            this.className = "hover";
            this.innerHTML = "Drop the file";
            return false;
        }
        el.ondragleave = function() {
            this.className = "";
            this.innerHTML = "Drop your logo here";
            return false;
        }
        el.ondrop = function (e) {
            e.preventDefault();
            for (var i = 0; i < e.dataTransfer.files.length; i++)
            {
                var file = e.dataTransfer.files[i].path;
                console.log(file);
            }
        }
    });
