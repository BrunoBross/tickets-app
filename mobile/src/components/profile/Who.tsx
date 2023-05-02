import { ScrollView, Text, View } from "react-native";
import Container from "../Container";

export default function Who() {
  return (
    <Container hasBack>
      <ScrollView>
        <View className="flex-1 gap-y-5">
          <Text className="text-white text-2xl font-semibold">Quem somos?</Text>
          <Text className="text-white text-base font-semibold text-justify">
            Bem-vindo ao nosso aplicativo de venda de ingressos para festas! Nós
            somos uma equipe apaixonada pelo universo da diversão e
            entretenimento e estamos comprometidos em oferecer a melhor
            experiência possível para você comprar ingressos para as melhores
            festas da cidade.
          </Text>
          <Text className="text-white text-base font-semibold text-justify">
            Nós entendemos a importância de encontrar o ingresso perfeito para a
            sua noite perfeita e é por isso que trabalhamos duro para oferecer
            uma grande variedade de opções para os eventos mais badalados da
            cidade.
          </Text>
          <Text className="text-white text-base font-semibold text-justify">
            Mas nós não somos apenas uma plataforma de venda de ingressos. Nossa
            equipe é formada por especialistas em eventos que estão sempre
            disponíveis para ajudá-lo em todas as etapas da sua experiência.
            Seja para orientá-lo na escolha dos ingressos ou para responder a
            qualquer dúvida, estamos sempre prontos para ajudá-lo e oferecer um
            atendimento personalizado.
          </Text>
          <Text className="text-white text-base font-semibold text-justify">
            E quando você compra um ingresso no nosso aplicativo, pode ter a
            certeza de que está fazendo negócio com uma empresa confiável e
            segura. Nós valorizamos muito a sua privacidade e segurança, e por
            isso trabalhamos apenas com os métodos de pagamento mais seguros e
            utilizamos as tecnologias mais avançadas para garantir a segurança
            de todas as suas transações.
          </Text>
          <Text className="text-white text-base font-semibold text-justify">
            Por fim, nosso compromisso com a comunidade é fundamental para nós.
            Por isso, frequentemente apoiamos e patrocinamos eventos locais,
            culturais e beneficentes, que ajudam a melhorar a vida das pessoas e
            da cidade como um todo. Acreditamos que uma boa festa pode mudar
            tudo, e estamos aqui para ajudá-lo a tornar cada noite uma
            experiência inesquecível.
          </Text>
          <Text className="text-white text-base font-semibold text-justify">
            Obrigado por escolher o nosso aplicativo. Estamos ansiosos para
            ajudá-lo a encontrar o ingresso perfeito para sua próxima festa!
          </Text>
          <Text className="text-zinc-600 text-base font-semibold text-justify pb-32">
            Isso não foi feito pelo CHAT GPT!!!!
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
