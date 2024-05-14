import { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Image, Input, SimpleGrid, Heading } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" p={0}>
      <Box
        w="100%"
        h="50vh"
        backgroundImage="url('/images/hero-background.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4} bg="rgba(0, 0, 0, 0.5)" p={8} borderRadius="md">
          <Heading as="h1" size="2xl" color="white">
            NomadRank
          </Heading>
          <Text fontSize="xl" color="white" textAlign="center">
            Discover the best cities for digital nomads around the world.
          </Text>
        </VStack>
      </Box>
      <Box p={4}>
        <VStack spacing={4}>
          <Input
            placeholder="Search for a city..."
            size="lg"
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<FaSearch />}
          />
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} w="100%">
            {filteredCities.map((city) => (
              <Box
                key={city.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
              >
                <Heading as="h3" size="md">
                  {city.city}
                </Heading>
                <Text>{city.country}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;