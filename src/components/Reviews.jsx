import { motion } from 'framer-motion'

function Reviews() {
  const reviewsData = [
    {
      name: "Babita Kumari",
      stars: "⭐⭐⭐⭐⭐",
      text: '"Nice rental house, owner is very polite and nice."',
      info: "1 year ago · Google Review"
    },
    {
      name: "Prahallad Nayak",
      stars: "⭐⭐⭐⭐⭐",
      text: '"Stayed here for 5 years while working at IIT Guwahati. My whole family loved it."',
      info: "Long-term tenant · Verified Stay"
    },
    {
      name: "Jyotsna Dogra",
      stars: "⭐⭐⭐⭐⭐",
      text: '"Stayed here for a year. Uncle and Aunty are very responsible. As a lady, I always felt safe here."',
      info: "4 year ago · Google Review"
    }
  ]

  return (
    <section id="reviews" className="py-20 bg-cream">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-3xl md:text-5xl font-bold text-center text-dark mb-4"
      >
        Reviews
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="reviews-summary flex flex-col items-center mb-12 text-center px-6"
      >
        <p className="reviews-rating text-5xl font-serif font-bold text-dark mb-1">4.2</p>
        <div className="reviews-stars text-xl mb-1">⭐⭐⭐⭐⭐</div>
        <p className="reviews-count text-text-muted text-sm font-medium">Based on 11 Google Reviews</p>
      </motion.div>
      
      <div className="reviews-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {reviewsData.map((review, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="review-card bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between"
            key={index}
          >
            <div>
              <div className="review-header flex justify-between items-center mb-4">
                <p className="review-name font-serif text-lg font-bold text-dark">{review.name}</p>
                <p className="review-stars text-xs">{review.stars}</p>
              </div>
              <p className="review-text text-text-main text-[0.95rem] leading-relaxed italic mb-6">
                {review.text}
              </p>
            </div>
            <p className="review-date text-text-muted text-xs font-medium border-t border-border/50 pt-4">
              {review.info}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Reviews