import React from 'react';

function CallToAction() {
  return (
    <section style={styles.cta}>
      <h2>Start Your Reading Journey</h2>
      <p>No subscription needed. Dive into a world of stories today.</p>
      <button>Start Buying</button>
    </section>
  );
}

const styles = {
  cta: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#1f7a51',
    color: 'white',
  },
};

export default CallToAction;
