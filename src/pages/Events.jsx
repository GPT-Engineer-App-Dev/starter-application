import { Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { useState } from "react";

const Events = () => {
  const { data: events, error, isLoading } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (currentEvent) {
      await updateEvent.mutateAsync({ ...formData, id: currentEvent.id });
    } else {
      await addEvent.mutateAsync(formData);
    }
    setFormData({
      name: "",
      date: "",
    });
    setCurrentEvent(null);
    onClose();
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData(event);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteEvent.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" mb={6}>Events</Heading>
      <Button colorScheme="teal" onClick={onOpen} mb={4}>Add Event</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Created At</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map(event => (
            <Tr key={event.id}>
              <Td>{event.name}</Td>
              <Td>{event.date}</Td>
              <Td>{new Date(event.created_at).toLocaleString()}</Td>
              <Td>
                <Button size="sm" onClick={() => handleEdit(event)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(event.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentEvent ? "Edit Event" : "Add Event"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {currentEvent ? "Update" : "Add"}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Events;