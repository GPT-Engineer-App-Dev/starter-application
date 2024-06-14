import { useState } from 'react';
import { Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, VStack, HStack, useToast } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaStar, FaLock, FaBan } from "react-icons/fa";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const toast = useToast();

  const handleAddEvent = async () => {
    const newEvent = {
      name: "New Event",
      date: new Date().toISOString().split('T')[0],
      venue_id: 1,
      is_starred: false,
      private: false,
      cancelled: false,
    };
    await addEvent.mutateAsync(newEvent);
    toast({ title: "Event added", status: "success", duration: 2000, isClosable: true });
  };

  const handleUpdateEvent = async (event) => {
    const updatedEvent = { ...event, name: event.name + " (Updated)" };
    await updateEvent.mutateAsync(updatedEvent);
    toast({ title: "Event updated", status: "success", duration: 2000, isClosable: true });
  };

  const handleDeleteEvent = async (id) => {
    await deleteEvent.mutateAsync(id);
    toast({ title: "Event deleted", status: "success", duration: 2000, isClosable: true });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Heading as="h1" size="xl">Events</Heading>
          <Button colorScheme="teal" onClick={handleAddEvent}>Add Event</Button>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Venue ID</Th>
              <Th>Starred</Th>
              <Th>Private</Th>
              <Th>Cancelled</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map(event => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>{event.venue_id}</Td>
                <Td>{event.is_starred ? <FaStar color="gold" /> : ""}</Td>
                <Td>{event.private ? <FaLock color="red" /> : ""}</Td>
                <Td>{event.cancelled ? <FaBan color="gray" /> : ""}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton icon={<FaEdit />} onClick={() => handleUpdateEvent(event)} />
                    <IconButton icon={<FaTrash />} onClick={() => handleDeleteEvent(event.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Events;