App.Controller.Payments = function($scope) {
  $scope.payments = Service.Payment();
  $scope.setScroll = function(){
    new iScroll(document.querySelector('#list-wraper'), {
      snap: true,
      momentum: false
    });
  };
  //@TODO change this method for set scroll, not a good idea to rely on the time
  setTimeout($scope.setScroll, 200);
};