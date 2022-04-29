import React, { Component } from 'react'
export class qrcode extends Component {
constructor(props) {
    super(props)

    this.state = {
      
            ImageUrl:''
       
    }
    // generateQrCode();
}

 generateQrCode = async (image) => {
    try {
          const response = await QRCode.toDataURL(image);
          this.setState({ImageUrl:response});
          // console.log(response)
    }catch (error) {
      // console.log(error);
    }
  }
    
    render() {
        // this.generateQrCode(this.props.value)
        return (
            <>
            <img src={ this.state.ImageUrl} width="150" height="150" />
            </>
        )
    }
}

export default qrcode;
