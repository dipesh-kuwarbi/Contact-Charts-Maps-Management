import { useSelector } from 'react-redux'
import Home from './Home'
import { selectContacts } from '../store/slices/contactsSlice'
import { RootState } from '../store/store'
import { useState } from 'react'
import { MdCancel } from 'react-icons/md'
import ContactDetails from '../components/contact/ContactDetails'
import ContactForm from '../components/contact/ContactForm'

const Contact: React.FC = () => {
  const contacts = useSelector((state: RootState) => selectContacts(state))

  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [contactId, setContactId] = useState<number | null>(null)
  const [showNoContactsModal, setShowNoContactsModal] = useState<boolean>(true)

  const handleNoContactsModal = () => {
    setShowNoContactsModal(!showNoContactsModal)
  }

  const handleSave = () => {
    setIsAdding(false)
    setIsEditing(false)
  }

  return (
    <Home>
      {/* Button to create a new contact */}
      {!isAdding && !isEditing && (
        <div className="flex justify-center mt-10 mb-10">
          <button
            onClick={() => setIsAdding(true)}
            className="py-2 px-4 bg-[#3E418D] text-white rounded hover:bg-[#44B] font-bold text-white text-2xl"
          >
            Create Contact
          </button>
        </div>
      )}

      {/* Display the contact details, if there are contacts */}
      {contacts.length !== 0 && !isEditing && !isAdding && (
        <ContactDetails
          handleEditing={(id) => {
            setIsEditing(true)
            setContactId(id)
          }}
          handleSave={handleSave}
        />
      )}

      {/* Display the contact form to add/ update the contact */}
      {(isAdding || isEditing) && (
        <ContactForm
          canEdit={isEditing}
          handleSave={handleSave}
          contactId={contactId}
        />
      )}

      {/* Display the modal if there are no contacts */}
      {contacts.length === 0 && showNoContactsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-[#3E418D] p-8 rounded-lg w-90 text-[#F9ECEE] relative">
            {/* Close Button */}
            <button
              onClick={handleNoContactsModal}
              className="absolute top-4 right-4 text-gray-300 hover:text-gray-100"
            >
              <MdCancel size={24} />
            </button>
            {/* Modal Content */}
            <div className="pt-4">
              <h2 className="text-lg font-bold mb-4">No Contacts Found</h2>
              <p className="mb-4">
                We don't have any contacts. Please add new contacts.
              </p>
              <button
                onClick={() => {
                  setIsAdding(true)
                  handleNoContactsModal()
                }}
                className="block mt-4 mx-auto py-2 px-4 bg-blue-600 text-white rounded"
              >
                Add Contacts
              </button>
            </div>
          </div>
        </div>
      )}
    </Home>
  )
}

export default Contact
