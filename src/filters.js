export default  {
    methods : {
      fyhLocal: function(fyh) {
        return new Date(fyh).toLocaleString()
      },
      ponerSignoPesos: function(importe) {
        return '$' + importe
      }
    }
}