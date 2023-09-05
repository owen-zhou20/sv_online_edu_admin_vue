<template>
  <div class="cart py-container">
    <!--Checkout-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">Success to create this order. </span>
          <span class="success-info">Please pay it now! Order Number: </span>
          <span class="success-info">{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">Pay:</em><em class="orange money">${{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">Wechat QR Code</div>
        <div class="fl sao">
          <p class="red">Please use Wechat to scan</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url"
                      :size="338" />
            <div class="saosao">
              <p>Please use Wechat to scan</p>
              <p>Scan Wechat QR code to pay</p>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> Other way for this payment</a></p> -->
      </div>
    </div>
  </div>
</template>


<script>
import ordersdApi from '@/api/orders'

export default {
  // Create Wechat QR Code by order No.
  asyncData({ params, error }) {
    return ordersdApi.createQrcode(params.pono)
      .then(response => {
        return {
          payObj: response.data.data
        }

      })
  },
  data() {
    return {
      timer1: ''  // timer
    }
  },
  // call interv every 3 seconds
  mounted() { // after
    this.timer1 = setInterval(() => {
      this.queryOrderStatus(this.payObj.out_trade_no)  // out_trade_no is orderNo
    }, 3000)

  },
  methods: {
    queryOrderStatus(orderNo) {
      ordersdApi.queryPayStatus(orderNo)
        .then(response => {
          if (response === undefined) { return }
          if (response.data.success && response.data.code == "20000") {
            // clear timer then success to pay
            clearInterval(this.timer1)
            // notice message
            this.$message({
              type: 'seuucess',
              message: 'Success to pay for this course!'
            })
            console.log('timer1===>'+this.timer1)
            // go to course info page
            this.$router.push({ path: '/course/' + this.payObj.course_id })
          }
        })
    }
  }

}
</script>