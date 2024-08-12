import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { selectContacts, deleteContact } from '../../store/slices/contactsSlice'

interface ContactDetailsProps {
  handleSave: () => void
  handleEditing: (id: number) => void
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
  handleEditing,
  handleSave,
}) => {
  const contacts = useSelector((state: RootState) => selectContacts(state))
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(id))
    }
  }

  const convertTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp)

    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }

    const formattedDate = date.toLocaleDateString('en-US', dateOptions)
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions)

    return `${formattedDate}, ${formattedTime}`
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  max-h-[70vh] overflow-y-auto">
        {contacts.map((details) => (
          <div
            key={details.id}
            className="bg-[#3E418D] p-6 rounded-lg shadow-lg flex flex-col justify-between border border-gray-300"
          >
            <div>
              <p className="font-bold text-2xl mb-4">
                <span className="text-gray-800 mr-10">Name:</span>
                <span className="text-white">
                  {details.firstName} {details.lastName}
                </span>
              </p>
              <p className="font-bold text-2xl mb-4">
                <span className="text-gray-800 mr-10">Status:</span>
                <span
                  className={`text-${details.status === 'active' ? 'green-800' : 'red-800'}`}
                >
                  {details.status.charAt(0).toUpperCase() +
                    details.status.slice(1)}
                </span>
              </p>
              <p className="font-bold text-2xl">
                <span className="text-gray-800 mr-10">Created at:</span>
                <span className="text-white">
                  {convertTimestampToDate(details.id)}
                </span>
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="bg-green-500 font-bold text-white text-2xl px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => {
                  handleEditing(details.id)
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 font-bold text-white text-2xl px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => {
                  handleDelete(details.id)
                  handleSave()
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactDetails
