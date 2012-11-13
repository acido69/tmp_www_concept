var Service = {};
//en las listas siempre devuelvo seis elementos; esto es importante para los test
Service.Coupon = function(id){
  var coupon = {
      'id'        :100,
      'name':'!YOU Sushi',
      'categorie':'Chef',
      'icon_src':'./assets/images/coupon.png',
      'info':'To redeem the coupon book your stay by calling 985 857 414. Enter your contact information. To redeem the coupon book your stay by calling 985 857 414.',
      'price':'$5 vouncher when you spend $25',
      'location':{
        'addr':'London, EC1R 3BT',
        'phone':'+44 (0)20 7841 0700'
      },
      'expire_date':'20 days to expire'
    };

  if (id){
    return coupon;
  }else{
    return [coupon,coupon,coupon,coupon,coupon,coupon];
  }
};

Service.Payment = function(id){
  var payment = {
      'id':100,
      'icon_src':'./assets/images/coupon.png',
      'number':'000 0000 00 00000000',
      'messages':[
        {'status_code':0,'type':1,'title':'Consigue ahora tu VISA Oro, totalmente gratis'},
        {'status_code':0,'type':2,'title':'Tienes pendiente esta renovaciónv'},
        {'status_code':1,'type':2,'title':'Tienes pendiente esta renovaciónv'},
        {'status_code':1,'type':3,'title':'Consulta ahora la nueva comisión de tu tajeta'},
        {'status_code':0,'type':3,'title':'Consulta ahora la nueva comisión de tu tajeta'},
        {'status_code':1,'type':3,'title':'Tienes pendiente esta renovación'},
        {'status_code':1,'type':2,'title':'Tienes pendiente esta renovaciónv'}
      ]
    };

  if (id){
    return payment;
  }else{
    return [payment,payment,payment,payment,payment,payment];
  }
};
