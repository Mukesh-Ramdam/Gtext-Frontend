import React, { useRef,} from 'react';
import './contact-details.css'


import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react'

  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'

import { useDeleteContactMutation, useGetAllContactsQuery, useUpdateContactMutation } from '../services/contactAPI';
import { setContact } from '../features/contactSlice';
import { useSelector, useDispatch } from 'react-redux';


function ContactDetails(props) {

    const dispatch = useDispatch()

    let allContacts = useGetAllContactsQuery()
    //  console.log("Contacts:", allContacts)
     const [deleteContact]= useDeleteContactMutation()

     const [updateContact] = useUpdateContactMutation()

     const { isOpen: isViewOpen , onOpen: onViewOpen, onClose: onViewClose } = useDisclosure()
     const openViewModal = useRef(onViewOpen)

     const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
     const openEditModal = useRef(onEditOpen)
     const closeEditModal = useRef(onEditClose)

     const handleOpenViewModal = (data) =>{
     openViewModal.current()
     dispatch(setContact(data)) 
     }


     const handleOpenEditModal = (data) =>{
     openEditModal.current()
     dispatch(setContact(data)) 
     }

     const updateThisContact = (data)=>{
      updateContact(data)
      closeEditModal.current()
     }

     const currentContact = useSelector(state => state.contact.contact)


 
    return (
        <div className='mx-4 bg-zinc-300'>
  <Table variant='simple' colorScheme=''>
    <Thead>
      <Tr>
        <Th>Contact Name</Th>
        <Th>Contact Number</Th>
        <Th>Contact Address</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>

    <Tbody>
    {
    allContacts.data?.map((contact, key)=>
        <Tr key={key}>
        <Td>{contact.name}</Td>
        <Td>{contact.number}</Td>
        <Td>{contact.address}</Td>

        {() => deleteContact(contact._id)}
        
        <Td className='flex justify-between m-0 p-0'><button className='bg-orange-500 px-8 py-2' onClick = {()=>handleOpenEditModal(contact)} >Edit</button> <button className='bg-rose-600 px-4 py-2' onClick ={() => deleteContact(contact._id)} >Delete</button> <button className='bg-sky-500 px-4 py-2' onClick = {()=>handleOpenViewModal(contact)}>View</button></Td>
      </Tr>
    )
    }
    </Tbody>
  </Table>

  {/* Modal for Edit */}
  <Modal size='md' className ='editModal' isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent height='60vh' bg='gray.300' px='6' py-2>
          <ModalHeader className='modalHeaderEdit'>Update Contact Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='modalBody'>
            <div>Name:<input placeholder='Name' value={currentContact.name} onChange={(e)=>{dispatch(setContact({...currentContact, name:e.target.value}))}}/></div>
            <div>Contact Number:<input placeholder='Contact Number' value={currentContact.number} onChange={(e)=>{dispatch(setContact({...currentContact, number:e.target.value}))}}/></div>
            <div>Address:<input placeholder='Address' value={currentContact.address} onChange={(e)=>{dispatch(setContact({...currentContact, address:e.target.value}))}}/></div>

            <div className ='updateBtnDiv'>
            <button  className='updateBtn' onClick={()=>{
              updateThisContact(currentContact)

              }}>
              Update
              </button>
            </div>
         
          </ModalBody>
        </ModalContent>
  </Modal>

{/* Modal for View */}
  <Modal size='md' isOpen={isViewOpen} onClose={onViewClose}>
        <ModalOverlay />
        <ModalContent height='50vh' bg='gray.300' px='16' py='2'>
          <ModalHeader className='modalHeaderView'>Contact Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='modalBody'>
            <div><span>Name: </span>{currentContact.name}</div>
            <div><span>Contact Number: </span>{currentContact.number} </div>
            <div><span>Address:</span> {currentContact.address} </div>
          </ModalBody>
        </ModalContent>
  </Modal>

  

        </div>
    );
}

export default ContactDetails;