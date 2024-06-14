import { Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: events, error, isLoading } = useEvents();

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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Venue</Th>
            <Th>Starred</Th>
            <Th>Private</Th>
            <Th>Cancelled</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map(event => (
            <Tr key={event.id}>
              <Td>{event.name}</Td>
              <Td>{event.date}</Td>
              <Td>{event.venue_id}</Td>
              <Td>{event.is_starred ? "Yes" : "No"}</Td>
              <Td>{event.private ? "Yes" : "No"}</Td>
              <Td>{event.cancelled ? "Yes" : "No"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Events;