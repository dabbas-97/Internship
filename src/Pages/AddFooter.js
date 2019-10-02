import React from 'react';
import Footer from './Footer/Footer';
const AddFooter = OriginalComponent => {
  class NewComponent extends React.Component {
    render() {
      return (
        <React.Fragment>
          <OriginalComponent />
          <Footer />
        </React.Fragment>
      );
    }
  }
  return NewComponent;
};
export default AddFooter;
