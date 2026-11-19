import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const houseRules = [
  {
    id: 1,
    icon: '🚫',
    title: 'No Unmarried Couples',
    tag: 'Strict Policy',
    tagStyle: 'bg-rose-50 text-rose-700 border-rose-200/80',
    description: 'Accommodations are strictly reserved for verified bachelors, students, and families. Unmarried couples are not permitted under any circumstances.'
  },
  {
    id: 2,
    icon: '🚭',
    title: 'Zero Substance Policy',
    tag: 'Zero Tolerance',
    tagStyle: 'bg-rose-50 text-rose-700 border-rose-200/80',
    description: 'Smoking, alcohol consumption, and any prohibited substances are strictly banned inside rooms, balconies, and anywhere across building premises.'
  },
  {
    id: 3,
    icon: '🌙',
    title: 'Quiet Hours (10 PM – 6 AM)',
    tag: 'Peace & Rest',
    tagStyle: 'bg-amber-50 text-amber-800 border-amber-200/80',
    description: 'To protect students preparing for exams and working tenants resting, maintain silence at night. Loud music and noisy gatherings are not allowed.'
  },
  {
    id: 4,
    icon: '🚪',
    title: 'Gate Curfew (10:30 PM)',
    tag: 'Building Security',
    tagStyle: 'bg-amber-50 text-amber-800 border-amber-200/80',
    description: 'The main entrance gate is locked at 10:30 PM for resident security. In case of academic deadlines or emergencies, notify the owner in advance.'
  },
  {
    id: 5,
    icon: '👥',
    title: 'Visitor & Guest Guidelines',
    tag: 'Day Guests Only',
    tagStyle: 'bg-stone-100 text-stone-700 border-stone-200',
    description: 'Day guests are welcome from 9:00 AM to 8:00 PM. Overnight stays for friends or relatives strictly require prior permission from property management.'
  },
  {
    id: 6,
    icon: '📹',
    title: '24/7 CCTV Surveillance',
    tag: 'Safety Verified',
    tagStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    description: 'Entrances, parking, and shared hallways are actively monitored 24/7 for resident safety. Tampering with cameras or fixtures is strictly prohibited.'
  },
  {
    id: 7,
    icon: '⚡',
    title: 'Utilities & Metered Power',
    tag: 'Conservation',
    tagStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    description: '24/7 clean water is supplied; please avoid wastage. Turn off lights, fans, and appliances when away. Electricity is billed transparently by sub-meter.'
  },
  {
    id: 8,
    icon: '✨',
    title: 'Hygiene & Cleanliness',
    tag: 'Community Care',
    tagStyle: 'bg-stone-100 text-stone-700 border-stone-200',
    description: 'Residents must keep rooms clean and corridors free of clutter. All domestic garbage must be bagged and deposited in the designated property bins.'
  },
  {
    id: 9,
    icon: '📋',
    title: '1-Month Vacating Notice',
    tag: 'Deposit Refund',
    tagStyle: 'bg-stone-100 text-stone-700 border-stone-200',
    description: 'A minimum 1-month advance notice is mandatory before vacating. This ensures room inspection and a prompt, full return of your security deposit.'
  }
]

function RulesModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop with elegant blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#141a12]/75 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Card - strictly bounded to 90vh and 95vw */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            style={{ maxHeight: '90vh', maxWidth: '95vw' }}
            className="relative bg-[#faf8f5] rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(20,26,18,0.35)] w-full flex flex-col overflow-hidden z-10 border border-[#1e251c]/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Header - Fixed at top (shrink-0) */}
            <div className="shrink-0 px-4 sm:px-6 md:px-8 py-3.5 sm:py-4 bg-white border-b border-[#1e251c]/8 flex justify-between items-center gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#c58f3e]/10 border border-[#c58f3e]/25 flex items-center justify-center text-lg sm:text-xl text-[#c58f3e] shadow-xs shrink-0">
                  📜
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#1e251c] tracking-tight truncate">
                    House Rules & Regulations
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5c6855] font-medium truncate">
                    Keshab Room Rent • Guidelines for a peaceful, safe, and comfortable community
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1e251c]/5 hover:bg-[#c58f3e] hover:text-white text-[#1e251c] flex items-center justify-center transition-all duration-300 cursor-pointer border border-[#1e251c]/5 text-sm shrink-0"
                aria-label="Close rules modal"
              >
                ✕
              </button>
            </div>

            {/* 2. Middle Content Area - ONLY this section scrolls */}
            <div 
              className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-5 md:p-7 space-y-5 sm:space-y-6"
              data-lenis-prevent
            >
              {/* Cards Grid: 3 per row on desktop, 2 on tablet, 1 on mobile. All cards equal height */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5 items-stretch">
                {houseRules.map((rule, idx) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 + 0.03 }}
                    className="h-full p-4 sm:p-5 rounded-2xl bg-white border border-[#1e251c]/8 shadow-[0_2px_10px_rgba(30,37,28,0.03)] hover:shadow-[0_10px_25px_-5px_rgba(197,143,62,0.15)] hover:border-[#c58f3e]/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="flex-1 flex flex-col">
                      {/* Icon + Tag row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#faf8f5] border border-[#1e251c]/8 flex items-center justify-center text-base sm:text-lg shadow-xs group-hover:scale-105 group-hover:border-[#c58f3e]/30 transition-all duration-300 shrink-0">
                          {rule.icon}
                        </div>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${rule.tagStyle}`}>
                          {rule.tag}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-[0.95rem] sm:text-[1rem] font-bold text-[#1e251c] mb-1.5 leading-snug group-hover:text-[#c58f3e] transition-colors duration-200">
                        {rule.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#5c6855] leading-relaxed font-normal">
                        {rule.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Banner: Moved cleanly out of card area, positioned after last row */}
              <div className="w-full rounded-2xl p-4 sm:p-5 md:p-6 bg-gradient-to-r from-[#f2ede4] to-white border border-[#c58f3e]/20 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#c58f3e]/15 text-[#c58f3e] flex items-center justify-center text-lg sm:text-xl shrink-0 mt-0.5">
                    🤝
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1e251c] font-serif mb-1">
                      Mutual Respect & Peaceful Living
                    </h4>
                    <p className="text-xs text-[#5c6855] leading-relaxed max-w-xl">
                      These policies ensure every resident enjoys quiet study hours, safety, and a spotless living environment. Need special permission for study projects or family visits? Contact the owner directly.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-start md:justify-end">
                  <a
                    href="tel:9365844130"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#c58f3e] hover:bg-[#996c27] text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-0.5 min-h-[38px]"
                  >
                    <span>📞</span>
                    <span>Call Owner</span>
                  </a>
                  <a
                    href="https://wa.me/919365844130"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1eb854] text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-0.5 min-h-[38px]"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Footer - Fixed at bottom (shrink-0), responsive wrapping */}
            <div className="shrink-0 px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 bg-white border-t border-[#1e251c]/8 flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-4">
              <span className="text-xs text-[#5c6855] font-medium text-center sm:text-left truncate max-w-full">
                Keshab Room Rent • Baruah Chowk, North Guwahati
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 rounded-full bg-[#1e251c] hover:bg-[#c58f3e] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm cursor-pointer min-h-[36px] flex items-center justify-center shrink-0"
              >
                Close Guidelines
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default RulesModal
