<template>
    <div 
    class="w-[80%] flex items-center justify-center mx-auto min-h-[calc(100vh-143px)]"
    >
        <div class="flex flex-col m-10">
            <h1 
            class="text-4xl text-center text-blue-900 font-bold"
            >
            Bem-vindo à Manutenções Pro
            </h1>
            <p
            class="py-5 text-2xl max-w-3xl max-sm:text-center"
            >Somos especialistas em serviços de manutenção industrial, oferecendo soluções 
                eficientes e personalizadas para garantir a operação contínua e segura 
                dos equipamentos da sua indústria. Com equipe qualificada e tecnologia 
                avançada, asseguramos qualidade, rapidez e redução de custos operacionais.
            </p>
            <button 
            type="button"
            class="p-2 bg-blue-400 w-100 cursor-pointer rounded-3xl flex text-center mx-auto text-[18px] max-sm:w-50 hover:bg-blue-500">
                <router-link 
                to="/contato" 
                class="mx-auto"
                >
                    SOLICITAR ORÇAMENTO
                </router-link>
            </button>
        </div>
    </div>
    
</template>