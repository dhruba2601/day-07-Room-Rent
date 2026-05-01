function Reviews() {
  return (
    <section id="reviews">
      <h2>What People Say</h2>
      <div className="reviews-summary">
        <p className="reviews-rating">4.2</p>
        <div className="reviews-stars">⭐⭐⭐⭐⭐</div>
        <p className="reviews-count">Based on 11 Google Reviews</p>
      </div>
      <div className="reviews-grid">
        <div className="review-card">
          <div className="review-header">
            <p className="review-name">Babita Kumari</p>
            <p className="review-stars">⭐⭐⭐⭐⭐</p>
          </div>
          <p className="review-text">"Nice rental house, owner is very polite and nice."</p>
          <p className="review-date">1 year ago · Google Review</p>
        </div>

        <div className="review-card">
          <div className="review-header">
            <p className="review-name">Prahallad Nayak</p>
            <p className="review-stars">⭐⭐⭐⭐⭐</p>
          </div>
          <p className="review-text">"Stayed here for 5 years while working at IIT Guwahati. My whole family loved it."</p>
          <p className="review-date">Long-term tenant · Verified Stay</p>
        </div>

        <div className="review-card">
          <div className="review-header">
            <p className="review-name">Jyotsna Dogra</p>
            <p className="review-stars">⭐⭐⭐⭐⭐</p>
          </div>
          <p className="review-text">"Stayed here for a year. Uncle and Aunty are very responsible. As a lady, I always felt safe here."</p>
          <p className="review-date">4 year ago · Google Review </p>
        </div>
      </div>
    </section>
  )
}

export default Reviews