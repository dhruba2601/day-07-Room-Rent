import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const DEFAULT_OWNERS = [
  {
    id: 'owner-1',
    name: 'Keshab Baruah',
    role: 'Property Owner & Manager',
    desc: 'Dedicated to offering clean, peaceful, and highly accessible living spaces for students, bachelors, and families in North Guwahati. Reach out below for queries.',
    phone: '9365844130',
    whatsapp: '919365844130'
  }
]

function OwnerCard({ owner, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(owner.isNew || false)
  const [showNumber, setShowNumber] = useState(false)
  const [autoSaved, setAutoSaved] = useState(false)
  const timeoutRef = useRef(null)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleFieldChange = (field, value) => {
    // Notify parent to save updates
    onUpdate(owner.id, { [field]: value })

    // Trigger local auto-saved badge feedback
    setAutoSaved(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setAutoSaved(false)
    }, 1500)
  }

  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2 && parts[0] && parts[parts.length - 1]) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase() || 'OW'
  }

  const maskedPhone = owner.phone.length > 5 
    ? `+91 ${owner.phone.slice(0, 5)} •••••` 
    : '+91 •••••'

  return (
    <div className="owner-card animate-fade-in">
      <button 
        className="card-edit-btn" 
        onClick={() => {
          setIsEditing(!isEditing)
          // If we toggle out of edit mode, make sure isNew is cleared in parent
          if (owner.isNew) {
            onUpdate(owner.id, { isNew: false })
          }
        }}
        aria-label={isEditing ? 'View profile' : 'Edit profile'}
      >
        {isEditing ? '✓ View' : '✏️ Edit'}
      </button>

      {isEditing ? (
        <div className="owner-edit-form animate-fade-in">
          <div className="form-header">
            <h3>Edit Profile</h3>
            {autoSaved && <span className="autosave-badge">✓ Auto-saved</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor={`owner-name-${owner.id}`}>Full Name</label>
            <input 
              id={`owner-name-${owner.id}`}
              type="text" 
              value={owner.name} 
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="e.g. Keshab Baruah"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`owner-role-${owner.id}`}>Role / Position</label>
            <input 
              id={`owner-role-${owner.id}`}
              type="text" 
              value={owner.role} 
              onChange={(e) => handleFieldChange('role', e.target.value)}
              placeholder="e.g. Property Manager"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`owner-desc-${owner.id}`}>Bio Description</label>
            <textarea 
              id={`owner-desc-${owner.id}`}
              rows="3"
              value={owner.desc} 
              onChange={(e) => handleFieldChange('desc', e.target.value)}
              placeholder="Tell potential tenants about yourself..."
            />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor={`owner-phone-${owner.id}`}>Phone Number</label>
              <input 
                id={`owner-phone-${owner.id}`}
                type="tel" 
                value={owner.phone} 
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="e.g. 9365844130"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`owner-whatsapp-${owner.id}`}>WhatsApp Number</label>
              <input 
                id={`owner-whatsapp-${owner.id}`}
                type="tel" 
                value={owner.whatsapp} 
                onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                placeholder="e.g. 919365844130"
              />
            </div>
          </div>

          <div className="form-actions-row">
            <button 
              type="button" 
              className="delete-profile-btn" 
              onClick={() => onDelete(owner.id)}
            >
              🗑️ Delete
            </button>

            <button 
              type="button" 
              className="save-profile-btn" 
              onClick={() => {
                setIsEditing(false)
                if (owner.isNew) {
                  onUpdate(owner.id, { isNew: false })
                }
              }}
            >
              💾 Save & View
            </button>
          </div>
        </div>
      ) : (
        <div className="owner-view-content animate-fade-in">
          <div className="owner-avatar">{getInitials(owner.name)}</div>
          <div className="owner-info">
            <h3>{owner.name}</h3>
            <p className="owner-role">{owner.role}</p>
            <p className="owner-desc">{owner.desc}</p>
          </div>
          
          <div className="owner-contact-box">
            <div className="phone-mask-container">
              <span className="phone-label">Direct Contact:</span>
              <span className={`phone-number ${showNumber ? 'revealed' : ''}`}>
                {showNumber ? `+91 ${owner.phone}` : maskedPhone}
              </span>
              <button 
                className="reveal-btn" 
                onClick={() => setShowNumber(!showNumber)}
                aria-label={showNumber ? "Hide number" : "Show number"}
              >
                {showNumber ? '👁️ Hide' : '👁️ Show'}
              </button>
            </div>
            
            <div className="owner-actions">
              <a href={`tel:${owner.phone}`} className="owner-action-btn call-btn">
                📞 Call Owner
              </a>
              <a 
                href={`https://wa.me/${owner.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="owner-action-btn whatsapp-btn"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Owner() {
  const [owners, setOwners] = useState(() => {
    const saved = localStorage.getItem('owners_list')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (err) {
        console.error("Failed to parse saved owners list", err)
        return DEFAULT_OWNERS
      }
    }
    
    // Check legacy single-owner storage item as fallback
    const legacySaved = localStorage.getItem('owner_details')
    if (legacySaved) {
      try {
        const parsed = JSON.parse(legacySaved)
        return [{ ...parsed, id: 'owner-1' }]
      } catch {
        return DEFAULT_OWNERS
      }
    }
    
    return DEFAULT_OWNERS
  })

  const saveOwners = (updatedList) => {
    setOwners(updatedList)
    localStorage.setItem('owners_list', JSON.stringify(updatedList))
  }

  // Add new owner profile
  const handleAddOwner = () => {
    const newOwner = {
      id: `owner-${Date.now()}`,
      name: 'Co-Owner Name',
      role: 'Property Owner / Manager',
      desc: 'Owner bio description. Click Edit to fill this space with your details.',
      phone: '9365844130',
      whatsapp: '919365844130',
      isNew: true
    }
    saveOwners([...owners, newOwner])
  }

  // Update specific owner profile
  const handleUpdateOwner = (id, updatedFields) => {
    const updatedList = owners.map(o => {
      if (o.id === id) {
        return { ...o, ...updatedFields }
      }
      return o
    })
    saveOwners(updatedList)
  }

  // Delete owner profile
  const handleDeleteOwner = (id) => {
    const ownerToDelete = owners.find(o => o.id === id)
    const name = ownerToDelete ? ownerToDelete.name : 'this owner'
    if (window.confirm(`Are you sure you want to delete the profile for ${name}?`)) {
      const updatedList = owners.filter(o => o.id !== id)
      saveOwners(updatedList)
    }
  }

  return (
    <motion.section 
      id="owner"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="owner-header-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Owner Details
        </motion.h2>
        <motion.button 
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="add-owner-btn" 
          onClick={handleAddOwner}
        >
          ➕ Add Owner Profile
        </motion.button>
      </div>

      <motion.div 
        className="owner-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {owners.map(owner => (
          <OwnerCard 
            key={owner.id} 
            owner={owner} 
            onUpdate={handleUpdateOwner}
            onDelete={handleDeleteOwner}
          />
        ))}
        {owners.length === 0 && (
          <p className="no-owners-msg">No owner profiles added yet. Click "+ Add Owner Profile" to start.</p>
        )}
      </motion.div>
    </motion.section>
  )
}

export default Owner
