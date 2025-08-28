<template>
    <section class="w-full min-h-[calc(100vh-143px)]">
        <div class="w-[80%] items-center justify-center mx-auto flex flex-col py-15">
            <h1 class="text-3xl pb-5 font-bold text-center">Entre em contato conosco</h1>
            <form class="bg-blue-900 p-10 w-[1000px] rounded-3xl max-[1100px]:w-[100%] max-sm:w-[100%]">
                <div class="w-[90%] my-0 mx-auto flex flex-col gap-7 max-[1100px]:items-center max-sm:w-[100%]">
                    <div class="flex gap-10 max-[1100px]:flex-col max-[520px]:w-[100%]">
                        <div class="flex flex-col">
                            <label for="nome" class="text-white my-3">Nome Completo</label>
                            <input type="text" id="nome" name="nome" required class="bg-[#e9f5f9] rounded-2xl outline-0 px-3 py-1 w-[250px] max-[520px]:w-[100%]">
                        </div>
                        <div class="flex flex-col">
                            <label for="email" class="text-white my-3">E-mail Corporativo</label>
                            <input type="email" id="email" name="email" required class="bg-[#e9f5f9] rounded-2xl outline-0 px-3 py-1 w-[250px] max-[520px]:w-[100%]">
                        </div>
                    </div>
                    <div class="flex flex-col max-[520px]:w-[100%]">
                        <label for="empresa" class="text-white my-3">Empresa</label>
                        <input type="text" id="empresa" class="bg-[#e9f5f9] rounded-2xl outline-0 px-3 py-1 w-[250px] max-[520px]:w-[100%]">
                    </div>
                    <div class="flex flex-col max-[520px]:w-[100%]">
                        <label for="descricao" class="text-white my-3">Descrição do Projeto</label>
                        <textarea id="descricao" required class="bg-[#e9f5f9] rounded-2xl outline-0 px-3 py-1 w-[400px] h-[200px] resize-none max-[520px]:w-[100%]"></textarea>
                    </div>
                    <input type="submit" value="Solicitar Orçamento" class="bg-[#e9f5f9] w-[200px] h-[38px] font-bold rounded-2xl text-center cursor-pointer hover:bg-blue-200 mx-auto my-0 max-sm:w-[100%]">
                </div>
            </form>
        </div>
    </section>
</template>