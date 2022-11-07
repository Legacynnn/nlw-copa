import { useState } from "react";
import { VStack, Text, Heading, useToast } from "native-base";
import { Alert } from "react-native";

import Logo from '../assets/logo.svg'

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function New() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handlePoolcreate() {
    if (!title.trim || title.length < 4) {
      return toast.show({
        title: 'Informe um nome para seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {
      setIsLoading(true)

      await api.post('/pools', {title: title})

      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      setTitle('')
      
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possivel criar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão"></Header>

      <VStack mt={8} mx={5} alignItems="center">
        <Logo/>

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          onChangeText={setTitle}
          value={title}
        />

        <Button 
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolcreate}
          isLoading={isLoading}
        />

        <Text textAlign="center" color="gray.200" fontSize="sm" mt={4} px={10}>
          Após criar seu bolão, você receberá um {"\n"} código único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>

    </VStack>
  )
}