function skillsMember() {
    return{
        restrict: 'E',
        templateUrl: 'app/members/member.html',
        controller: 'MemberController',
        controllerAs: 'memberCtrl',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}