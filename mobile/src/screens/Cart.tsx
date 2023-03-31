import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api";

export default function Cart() {
  const { user } = useAuth();
  const { cartList, clearCartList } = useCart();

  const handleBuyTickets = async () => {
    if (user) {
      cartList.forEach(async (event) => {
        const ticket = {
          user_id: user.id,
          event_id: event.eventId,
          ticket_type_id: event.ticketType.id,
        };

        await api({
          method: "post",
          url: "/ticket",
          data: ticket,
        });
      });
      clearCartList();
    }
  };

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <Text className="text-white text-4xl font-extrabold tracking-widest">
        Carrinho
      </Text>
      {user ? (
        <View className="flex flex-1 justify-between">
          <ScrollView>
            {cartList.length > 0 ? (
              cartList.map((event) => {
                return <CartItem key={event.id} event={event} />;
              })
            ) : (
              <Text className="text-white text-xl">
                Seu carrinho está vazio
              </Text>
            )}
          </ScrollView>
          {cartList && cartList.length > 0 && (
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex border-2 flex-row bg-violet-600 p-4 rounded-md"
                onPress={handleBuyTickets}
                disabled={!(cartList && cartList.length > 0)}
              >
                <MaterialCommunityIcons
                  name="cart-arrow-down"
                  size={24}
                  color={colors.white}
                />
                <Text className=" text-white text-base font-semibold pl-2">
                  Efetuar compra
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex border-2 flex-row bg-zinc-700 p-4 rounded-md"
                onPress={clearCartList}
              >
                <MaterialCommunityIcons
                  name="cart-remove"
                  size={24}
                  color={colors.white}
                />
                <Text className=" text-white text-base font-semibold pl-2">
                  Esvaziar Carrinho
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View className="flex flex-1 justify-between">
          <Text className="text-white text-base font-semibold pl-2">
            Você precisa estar logado!
          </Text>
        </View>
      )}
    </View>
  );
}
