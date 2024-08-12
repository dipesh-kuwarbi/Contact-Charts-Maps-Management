import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addContact,
  selectContacts,
  updateContact,
} from '../../store/slices/contactsSlice'
import { Contact } from '../../store/types'
import { AppDispatch, RootState } from '../../store/store'

interface ContactFormProps {
  canEdit: boolean
  handleSave: () => void
  contactId?: number | null
}

const ContactForm: React.FC<ContactFormProps> = ({
  canEdit,
  handleSave,
  contactId,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const contacts = useSelector((state: RootState) => selectContacts(state))

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [status, setStatus] = useState<string>('active')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    // Prepopulate the form if editing an existing contact
    if (canEdit && contactId) {
      const contactToEdit = contacts.find((contact) => contact.id === contactId)
      if (contactToEdit) {
        setFirstName(contactToEdit.firstName)
        setLastName(contactToEdit.lastName)
        setStatus(contactToEdit.status)
      }
    }
  }, [canEdit, contactId, contacts])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let formErrors: { [key: string]: string } = {}

    if (!firstName) {
      formErrors.firstName = 'First Name is required'
    }

    if (!lastName) {
      formErrors.lastName = 'Last Name is required'
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      setLoading(true) // Set loading to true
      try {
        if (canEdit && contactId) {
          // Dispatch updateContact action
          await dispatch(
            updateContact({ id: contactId, firstName, lastName, status })
          )
        } else {
          // Dispatch addContact action
          await dispatch(
            addContact({ id: Date.now(), firstName, lastName, status })
          )
        }
        // Reset form fields after successful submission
        setFirstName('')
        setLastName('')
        setErrors({})
      } finally {
        setLoading(false)
        handleSave()
      }
    }
  }

  return (
    <div className="h-full">
      <div className="flex flex-row justify-center mt-10 mb-10">
        <h2 className="text-lg font-bold text-[#3E418D]">
          {canEdit ? 'Edit Contact' : 'Create Contact'}
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="bg-[#3E418D] p-8 rounded-lg shadow-lg hover:shadow-xl w-full max-w-lg transition-shadow duration-300">
          <form onSubmit={handleSubmit}>
            <div className="mt-4 flex items-center">
              <label
                className="text-white text-sm font-bold w-1/4"
                htmlFor="fName"
              >
                First Name:
              </label>
              <input
                className={`w-full p-2 border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } rounded focus:outline-none focus:border-blue-500 text-[#3E418D]`}
                id="fName"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  if (errors.firstName && e.target.value) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      firstName: '',
                    }))
                  }
                }}
                placeholder="Enter First Name"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs italic mb-4">
                {errors.firstName}
              </p>
            )}

            <div className="mt-4 flex items-center">
              <label
                className="text-white text-sm font-bold w-1/4"
                htmlFor="lName"
              >
                Last Name:
              </label>
              <input
                className={`w-full p-2 border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } rounded focus:outline-none focus:border-blue-500 text-[#3E418D]`}
                id="lName"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                  if (errors.lastName && e.target.value) {
                    setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }))
                  }
                }}
                placeholder="Enter Last Name"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs italic mb-4">
                {errors.lastName}
              </p>
            )}

            <div className="mt-4 flex items-center">
              <label className="text-white text-sm font-bold w-1/4">
                Status:
              </label>
              <div className="w-full">
                <label className="text-white mr-4">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={status === 'active'}
                    onChange={() => setStatus('active')}
                    className="mr-1"
                  />
                  Active
                </label>
                <label className="text-white">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={status === 'inactive'}
                    onChange={() => setStatus('inactive')}
                    className="mr-1"
                  />
                  Inactive
                </label>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : canEdit ? (
                  'Save Editted Contact'
                ) : (
                  'Save Contact'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
